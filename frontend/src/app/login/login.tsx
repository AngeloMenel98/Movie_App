"use client";
import React, { useState, useEffect } from "react";
import Button from "@/components/buttons/button";
import Input from "@/components/inputs/input";
import { loginUser } from "@/services/user.service";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/user-context";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shouldRemember, setShouldRemember] = useState(false);
  const router = useRouter();
  const { setToken, isInitialized } = useUser();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    if (isInitialized && typeof window !== "undefined") {
      const savedEmail = localStorage.getItem("rememberedEmail");
      if (savedEmail) {
        setFormData((prev) => ({ ...prev, email: savedEmail }));
        setShouldRemember(true);
      }
    }
  }, [isInitialized]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { email: "", password: "" };

    if (!formData.email.trim()) {
      newErrors.email = "El correo electrónico es obligatorio";
      valid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Ingresa un correo electrónico válido";
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = "La contraseña es obligatoria";
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const response = await loginUser(formData.email, formData.password);

      if (response.token) {
        if (shouldRemember && typeof window !== "undefined") {
          localStorage.setItem("rememberedEmail", formData.email);
        } else if (typeof window !== "undefined") {
          localStorage.removeItem("rememberedEmail");
        }

        setToken(response.token);
        router.push("/home");
      } else {
        throw new Error("Token not received");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      const errorMessage = err.response?.data?.message || "Invalid credentials";
      setErrors((prev) => ({ ...prev, password: errorMessage }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
            <svg
              className="h-8 w-8 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Inicia sesión
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Ingresa tus credenciales para acceder a tu cuenta
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8">
          <form onSubmit={handleSubmit} noValidate>
            <div className="space-y-6">
              <Input
                label="Correo electrónico"
                name="email"
                type="email"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                errorMessage={errors.email}
                autoComplete="email"
              />

              <Input
                label="Contraseña"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                errorMessage={errors.password}
                autoComplete="current-password"
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                isLoading={isSubmitting}
                disabled={isSubmitting}
              >
                Iniciar sesión
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
