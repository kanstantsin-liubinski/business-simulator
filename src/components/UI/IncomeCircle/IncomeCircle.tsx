"use client";

import React, { useEffect, useState, useRef } from "react";
import { SCHEDULER_INTERVAL_MS } from "lib/scheduler-config";
import styles from "./IncomeCircle.module.css";

interface IncomeCircleProps {
  monthlyIncome: number;
}

export default function IncomeCircle({ monthlyIncome }: IncomeCircleProps) {
  const [progress, setProgress] = useState(0);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const cycleDuration = SCHEDULER_INTERVAL_MS;

    const animate = () => {
      // Синхронизируем анимацию с глобальным временем (сервер-клиент)
      // Это обеспечивает синхронизацию круга со всеми клиентами и с моментом обновления баланса
      const now = Date.now();
      const newProgress = (now % cycleDuration) / cycleDuration;
      setProgress(newProgress);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Не показываем если нет дохода
  if (monthlyIncome === 0) {
    return null;
  }

  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 44 44"
      className={styles.svg}
    >
      {/* Фоновый круг */}
      <circle
        cx="22"
        cy="22"
        r={radius}
        fill="none"
        stroke="rgba(59, 130, 246, 0.15)"
        strokeWidth="2"
      />

      {/* Градиент для прогресса */}
      <defs>
        <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="50%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>

      {/* Прогресс-круг */}
      <circle
        cx="22"
        cy="22"
        r={radius}
        fill="none"
        stroke="url(#progressGradient)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        transform="rotate(-90 22 22)"
        className={styles.progressCircle}
      />

      {/* Центральная иконка */}
      <text
        x="22"
        y="22"
        textAnchor="middle"
        dominantBaseline="middle"
        className={styles.icon}
      >
        💰
      </text>
    </svg>
  );
}
