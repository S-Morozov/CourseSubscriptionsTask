import React, { useEffect, useState } from 'react';
import CourseList from './components/CourseList/CourseList';
import { Course, User } from '../types'; 
import axios from 'axios';
import './App.css'; 
import NavBar from './components/Navbar/Navbar';
import Footer from './components/Footer/footer';
import Basket from './components/Basket/Basket';
import MyCourses from './components/MyCourses/MyCourses';

const App: React.FC = () => {
    const [subscribedCourses, setSubscribedCourses] = useState<Course[]>([]); // List of courses the user is subscribed to
    const [basketCourses, setBasketCourses] = useState<Course[]>([]); // Courses in the basket (ready to be subscribed)
    const [currentUser, setCurrentUser] = useState<User | null>(null); // Currently logged in user
    const [notification, setNotification] = useState<string | null>(null); // For showing subscription/unsubscription messages
    const [draggedCourseId, setDraggedCourseId] = useState<string | null>(null); // To track dragged course during drag-and-drop

    // Fetch users when the component mounts
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/users'); // Fetch users from backend
                const users = response.data.result;
                if (users.length > 0) {
                    setCurrentUser(users[0]);  // Set the first user as the current user
                }
            } catch (error) {
                console.error('Error fetching users:', error); // Log error if users cannot be fetched
            }
        };

        fetchUsers();
    }, []);

    // Add a course to the basket (if it's not already in the basket)
    const handleSubscribe = (course: Course) => {
        if (!basketCourses.some(basketCourse => basketCourse.sys_id === course.sys_id)) {
            setBasketCourses(prevBasket => [...prevBasket, course]); // Add course to basket
        }
    };

    // Handle the start of dragging a course (track the dragged course ID)
    const handleDragStart = (course: Course) => {
        console.log('Dragging:', course.title);
        setDraggedCourseId(course.sys_id); // Set dragged course ID
    };

    // Handle drop event (subscribe to the course that was dragged and dropped)
    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault(); // Prevent default behavior
        if (draggedCourseId) {
            const droppedCourse = basketCourses.find(course => course.sys_id === draggedCourseId);
            if (droppedCourse) {
                handleSubscribe(droppedCourse); // Add course to basket
                setDraggedCourseId(null); // Clear dragged course ID after dropping
            }
        }
    };

    // Allow drag-over event (necessary for enabling dropping)
    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault(); // Allow drop event
    };

    // Handle confirming the subscription to the courses in the basket
    const handleConfirmSubscription = async () => {
        if (currentUser) {
            try {
                // Subscribe to all courses in the basket
                await Promise.all(
                    basketCourses.map(course =>
                        axios.post('http://localhost:5001/api/subscribe', {
                            title: course.title,
                            userId: currentUser.user_id // Ensure the user_id exists
                        })
                    )
                );

                setSubscribedCourses(prevSubscribed => [...prevSubscribed, ...basketCourses]); // Add basket courses to subscribed courses
                setBasketCourses([]); // Clear the basket after subscription
                setNotification(`You have successfully subscribed to: ${basketCourses.map(course => course.title).join(', ')}`);
            } catch (error) {
                console.error('Error subscribing to courses:', error); // Log error if subscription fails
                setNotification('An error occurred during subscription. Please try again later.');
            }
        }
    };

    // Handle unsubscribing from a course
    const handleUnsubscribe = async (course: Course) => {
        if (currentUser) {
            try {
                // Send a request to unsubscribe from the course
                await axios.delete(`http://localhost:5001/api/unsubscribe`, {
                    data: { userId: currentUser.user_id, title: course.title }
                });

                setSubscribedCourses(prevSubscribed => prevSubscribed.filter(sub => sub.sys_id !== course.sys_id)); // Remove unsubscribed course
                setNotification(`You have successfully unsubscribed from: ${course.title}`);
            } catch (error) {
                console.error('Error unsubscribing from course:', error); // Log error if unsubscription fails
                setNotification('An error occurred during unsubscription. Please try again later.');
            }
        }
    };

    return (
        <div className="App">
            <NavBar />
            <header className="App-header">
                <h1>Welcome, {currentUser ? currentUser.username : 'Guest'}!</h1> {/* Display current user's name */}
            </header>
            <main>
                <section className='coursesListContainer'>
                    <div className='titleCard'>
                        <h3>Our Best Courses</h3>
                    </div>
                    <div className='coursesList'>
                        <CourseList onSubscribe={handleSubscribe} onDragStart={handleDragStart} /> {/* List of available courses */}
                    </div>
                </section>

                {/* Basket section (for confirming subscriptions) */}
                <section className='basketContainer' onDrop={handleDrop} onDragOver={handleDragOver}>
                    <Basket 
                        basketCourses={basketCourses} // Courses in the basket
                        onConfirm={handleConfirmSubscription} // Confirm subscription
                        onRemove={(course) => setBasketCourses(basketCourses.filter(c => c.sys_id !== course.sys_id))} // Remove from basket
                    />
                </section>

                {/* My Courses section (showing courses the user is subscribed to) */}
                <section className="myCoursesContainer">
                    <h3>My Courses</h3>
                    {subscribedCourses.length > 0 ? (
                        <MyCourses courses={subscribedCourses} onUnsubscribe={handleUnsubscribe} /> // List of subscribed courses
                    ) : (
                        <p>You do not have any subscribed courses yet.</p> // Message if no courses are subscribed
                    )}
                </section>

                {/* Notification section for feedback on actions like subscription/unsubscription */}
                {notification && (
                    <div className="notification">
                        <p>{notification}</p>
                        <button onClick={() => setNotification(null)}>Close</button> {/* Close notification */}
                    </div>
                )}
            </main>
            <Footer /> {/* Footer component */}
        </div>
    );
};

export default App;
