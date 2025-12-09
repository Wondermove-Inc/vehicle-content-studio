import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * 🎯 목적: Tailwind CSS 클래스 병합 유틸리티
 * 📝 설명: clsx와 tailwind-merge를 조합하여 클래스 충돌을 해결
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
