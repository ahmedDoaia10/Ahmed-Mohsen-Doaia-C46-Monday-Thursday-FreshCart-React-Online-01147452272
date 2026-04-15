"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { registerSchema, registerTypeSchema } from "@/schemas/auth.schemas";
import { registerUser } from "@/services/auth.services";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import Link from "next/link";

function getPasswordStrength(val: string) {
  if (val.length === 0) return null;
  if (val.length < 6)
    return {
      label: "Weak",
      color: "bg-red-500",
      width: "w-1/4",
      textColor: "text-[14px] font-medium text-[#364153]",
    };
  if (val.length < 10 || !/[0-9!@#$%^&*]/.test(val))
    return {
      label: "Fair",
      color: "bg-orange-500",
      width: "w-1/2",
      textColor: "text-[14px] font-medium text-[#364153]",
    };
  return {
    label: "Strong",
    color: "bg-green-500",
    width: "w-full",
    textColor: "text-[14px] font-medium text-[#364153]",
  };
}

export default function Register() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
  });

  async function handleRegister(data: registerTypeSchema) {
    try {
      const response = await registerUser(data);

      if (response.message === "success") {
        toast.success("Account created successfully", {
          description: "Please log in to your new account.",
          duration: 2000,
          position: "top-right",
        });

        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        toast.error("Failed to create account", {
          description: response.message || "Please try again.",
          duration: 3000,
          position: "top-right",
        });
      }
    } catch (error: unknown) {
      let errorMessage = "Failed to create account";

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast.error("Registration failed", {
        description: errorMessage,
        duration: 3000,
        position: "top-right",
      });
    }
  }

  return (
    <>
      <main className="min-h-screen ">
        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto items-start">
            {/* Left Side - Welcome & Features */}
            <div className="space-y-8 lg:pt-3">
              {/* Header */}
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-3">
                  Welcome to <span className="text-[#16a34a]">FreshCart</span>
                </h1>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Join thousands of happy customers who enjoy fresh groceries
                  delivered right to their doorstep.
                </p>
              </div>

              {/* Features */}
              <div className="space-y-6">
                {/* Premium Quality */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                    <svg
                      viewBox="0 0 512 512"
                      className="w-5 h-5 text-[#16a34a]"
                      fill="currentColor"
                    >
                      <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg mb-1">
                      Premium Quality
                    </h3>
                    <p className="text-gray-600">
                      Premium quality products sourced from trusted suppliers.
                    </p>
                  </div>
                </div>

                {/* Fast Delivery */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                    <svg
                      viewBox="0 0 576 512"
                      className="w-5 h-5 text-[#16a34a]"
                      fill="currentColor"
                    >
                      <path d="M0 96C0 60.7 28.7 32 64 32l288 0c35.3 0 64 28.7 64 64l0 32 50.7 0c17 0 33.3 6.7 45.3 18.7L557.3 192c12 12 18.7 28.3 18.7 45.3L576 384c0 35.3-28.7 64-64 64l-3.3 0c-10.4 36.9-44.4 64-84.7 64s-74.2-27.1-84.7-64l-102.6 0c-10.4 36.9-44.4 64-84.7 64s-74.2-27.1-84.7-64L64 448c-35.3 0-64-28.7-64-64L0 96zM512 288l0-50.7-45.3-45.3-50.7 0 0 96 96 0zM192 424a40 40 0 1 0 -80 0 40 40 0 1 0 80 0zm232 40a40 40 0 1 0 0-80 40 40 0 1 0 0 80z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg mb-1">
                      Fast Delivery
                    </h3>
                    <p className="text-gray-600">
                      Same-day delivery available in most areas.
                    </p>
                  </div>
                </div>

                {/* Secure Shopping */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                    <svg
                      viewBox="0 0 512 512"
                      className="w-5 h-5 text-[#16a34a]"
                      fill="currentColor"
                    >
                      <path d="M256 0c4.6 0 9.2 1 13.4 2.9L457.8 82.8c22 9.3 38.4 31 38.3 57.2-.5 99.2-41.3 280.7-213.6 363.2-16.7 8-36.1 8-52.8 0-172.4-82.5-213.1-264-213.6-363.2-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.9 1 251.4 0 256 0zm0 66.8l0 378.1c138-66.8 175.1-214.8 176-303.4l-176-74.6 0 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg mb-1">
                      Secure Shopping
                    </h3>
                    <p className="text-gray-600">
                      Your data and payments are completely secure.
                    </p>
                  </div>
                </div>
              </div>

              {/* Testimonial */}
              <Card className="bg-white p-6 border-l-4 border-[#16a34a] shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-lg font-bold text-[#16a34a]">SJ</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-gray-900">
                        Sarah Johnson
                      </h4>
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            viewBox="0 0 576 512"
                            className="w-4 h-4"
                            fill="currentColor"
                          >
                            <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 italic text-sm leading-relaxed">
                      FreshCart has transformed my shopping experience. The
                      quality of the products is outstanding, and the delivery
                      is always on time. Highly recommend!
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Right Side - Register Form */}
            <div className="bg-white rounded-2xl shadow-xl px-10 py-8 lg:px-6  lg:py-10 ">
              <div className="mb-6">
                <h2 className="text-3xl font-semibold text-[#364153] mb-2 text-center">
                  Create Your Account
                </h2>
                <p className="text-[#364153] text-center font-medium text-[16px]">
                  Start your fresh journey with us today
                </p>
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-gray-300  hover:bg-gray-50 flex items-center justify-center gap-2 h-10 text-base font-medium cursor-pointer rounded-md"
                >
                 <svg data-prefix="fab" data-icon="google" className="svg-inline--fa fa-google  text-red-600" role="img" viewBox="0 0 512 512" aria-hidden="true"><path fill="currentColor" d="M500 261.8C500 403.3 403.1 504 260 504 122.8 504 12 393.2 12 256S122.8 8 260 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9c-88.3-85.2-252.5-21.2-252.5 118.2 0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9l-140.8 0 0-85.3 236.1 0c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
                <span className="text-[#101828] font-semibold text-[16px] ">Google</span>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-gray-300  hover:bg-gray-50 flex items-center justify-center gap-2 h-10 text-base font-medium cursor-pointer rounded-md"
                >
                  <svg
                    className="w-5 h-5 text-blue-600"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span className="text-[#101828] font-semibold text-[16px] ">Facebook</span>
                </Button>
              </div>

              <div className="divider relative w-full h-0.5 bg-gray-300/30 my-4 mt-10 flex items-center before:content-['or'] before:absolute before:top-1/2 before:left-1/2 before:-translate-1/2 before:bg-white before:px-4" aria-hidden="true"><span className="sr-only text-[#364153]!">or</span></div>

              {/* Form */}
              <form
                onSubmit={form.handleSubmit(handleRegister)}
                className="space-y-4"
              >
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} >
                      <FieldLabel htmlFor={field.name} className="text-[#364153]  font-medium text-[16px]">
                        Name*
                      </FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        type="text"
                        placeholder="Ali"
                        autoComplete="off"
                        
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name} className="text-[#364153]  font-medium text-[16px]">
                        Email*
                      </FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        type="email"
                        placeholder="ali@example.com"
                        autoComplete="off"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => {
                    const strength = getPasswordStrength(field.value || "");
                    return (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name} className="text-[#364153]  font-medium text-[16px]">
                          Password*
                        </FieldLabel>
                        <Input
                          {...field}
                          id={field.name}
                          type="password"
                          placeholder="create a strong password"
                          autoComplete="off"
                        />
                        {/* Strength Bar */}
                        <div className="mt-1.5">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-xs text-gray-500">
                              Must be at least 8 characters with numbers and
                              symbols
                            </p>
                            {strength && (
                              <span
                                className={`text-xs font-medium shrink-0 ml-2 ${strength.textColor}`}
                              >
                                {strength.label}
                              </span>
                            )}
                          </div>
                          <div className="h-1 w-full bg-gray-200 rounded-md overflow-hidden">
                            <div
                              className={`h-full  transition-all duration-300 ${strength ? strength.color : ""} ${strength ? strength.width : "w-0"}`}
                            />
                          </div>
                        </div>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    );
                  }}
                />

                <Controller
                  name="rePassword"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name} className="text-[#364153]  font-medium text-[16px]">
                        Confirm Password*
                      </FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        type="password"
                        placeholder="confirm your password"
                        autoComplete="off"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="phone"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name} className="text-[#364153]  font-medium text-[16px]">
                        Phone Number*
                      </FieldLabel>
                      <Input
                        {...field}
                        type="tel"
                        id={field.name}
                        placeholder="+1 234 567 8900"
                        autoComplete="off"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <div className="flex items-start gap-2 pt-2 mt-5">
                  <input type="checkbox" id="terms" className="size-4 accent-[#16a34a] mt-1.5 cursor-pointer" name="terms"></input>
                  <label
                    htmlFor="terms"
                    className="text-[16px] font-medium text-[#364153] leading-relaxed ms-2"
                  >
                    I agree to the{" "}
                    <Link href="/terms" className="text-[#16a34a] hover:underline ">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="text-[#16a34a] hover:underline"
                    >
                      Privacy Policy
                    </Link>
                    *{" "}
                    
                  </label>
                </div>

                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="w-full bg-[#16a34a] text-white hover:bg-[#15803d] h-12 text-base font-medium mt-3 cursor-pointer"
                >
                  {form.formState.isSubmitting
                    ? "Creating Account..."
                    : "Create My Account"}
                </Button>

                <p className="border-t pt-10 border-gray-300/30 font-medium text-[16px] text-[#364153] my-4 text-center">Already have an account? <a className="text-[#16a34a] hover:underline  font-medium" href="/login">Sign In</a></p>
              </form>
            </div>
          </div>
        </div>

        {/* Features Bar */}
        <div className="bg-green-50 border-y border-green-100 mt-16">
          <div className="container mx-auto px-4 py-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Free Shipping */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                  <svg
                    viewBox="0 0 576 512"
                    className="w-5 h-5 text-[#16a34a]"
                    fill="currentColor"
                  >
                    <path d="M0 96C0 60.7 28.7 32 64 32l288 0c35.3 0 64 28.7 64 64l0 32 50.7 0c17 0 33.3 6.7 45.3 18.7L557.3 192c12 12 18.7 28.3 18.7 45.3L576 384c0 35.3-28.7 64-64 64l-3.3 0c-10.4 36.9-44.4 64-84.7 64s-74.2-27.1-84.7-64l-102.6 0c-10.4 36.9-44.4 64-84.7 64s-74.2-27.1-84.7-64L64 448c-35.3 0-64-28.7-64-64L0 96zM512 288l0-50.7-45.3-45.3-50.7 0 0 96 96 0zM192 424a40 40 0 1 0 -80 0 40 40 0 1 0 80 0zm232 40a40 40 0 1 0 0-80 40 40 0 1 0 0 80z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">
                    Free Shipping
                  </h4>
                  <p className="text-gray-500 text-xs">
                    On orders over 500 EGP
                  </p>
                </div>
              </div>

              {/* Easy Returns */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                  <svg
                    viewBox="0 0 512 512"
                    className="w-4.5 h-4.5 text-[#16a34a]"
                    fill="currentColor"
                  >
                    <path d="M256 64c-56.8 0-107.9 24.7-143.1 64l47.1 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 192c-17.7 0-32-14.3-32-32L0 32C0 14.3 14.3 0 32 0S64 14.3 64 32l0 54.7C110.9 33.6 179.5 0 256 0 397.4 0 512 114.6 512 256S397.4 512 256 512c-87 0-163.9-43.4-210.1-109.7-10.1-14.5-6.6-34.4 7.9-44.6s34.4-6.6 44.6 7.9c34.8 49.8 92.4 82.3 157.6 82.3 106 0 192-86 192-192S362 64 256 64z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">
                    Easy Returns
                  </h4>
                  <p className="text-gray-500 text-xs">14-day return policy</p>
                </div>
              </div>

              {/* Secure Payment */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                  <svg
                    viewBox="0 0 512 512"
                    className="w-4.5 h-4.5 text-[#16a34a]"
                    fill="currentColor"
                  >
                    <path d="M256 0c4.6 0 9.2 1 13.4 2.9L457.8 82.8c22 9.3 38.4 31 38.3 57.2-.5 99.2-41.3 280.7-213.6 363.2-16.7 8-36.1 8-52.8 0-172.4-82.5-213.1-264-213.6-363.2-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.9 1 251.4 0 256 0zm0 66.8l0 378.1c138-66.8 175.1-214.8 176-303.4l-176-74.6 0 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">
                    Secure Payment
                  </h4>
                  <p className="text-gray-500 text-xs">100% secure checkout</p>
                </div>
              </div>

              {/* 24/7 Support */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                  <svg
                    viewBox="0 0 448 512"
                    className="w-4.5 h-4.5 text-[#16a34a]"
                    fill="currentColor"
                  >
                    <path d="M224 64c-79 0-144.7 57.3-157.7 132.7 9.3-3 19.3-4.7 29.7-4.7l16 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-16 0c-53 0-96-43-96-96l0-64C0 100.3 100.3 0 224 0S448 100.3 448 224l0 168.1c0 66.3-53.8 120-120.1 120l-87.9-.1-32 0c-26.5 0-48-21.5-48-48s21.5-48 48-48l32 0c26.5 0 48 21.5 48 48l0 0 40 0c39.8 0 72-32.2 72-72l0-20.9c-14.1 8.2-30.5 12.8-48 12.8l-16 0c-26.5 0-48-21.5-48-48l0-96c0-26.5 21.5-48 48-48l16 0c10.4 0 20.3 1.6 29.7 4.7-13-75.3-78.6-132.7-157.7-132.7z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">
                    24/7 Support
                  </h4>
                  <p className="text-gray-500 text-xs">Contact us anytime</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
