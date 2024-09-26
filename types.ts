// src/types.ts
export interface Course {
  sys_id: string;
  title: string;
  description: string;
  duration: string; // Продолжительность в строковом формате
}

export interface User {
  user_id: string;
  sys_id: string;
  username: string;
  email: string; // Email пользователя
}
