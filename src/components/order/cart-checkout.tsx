"use client";
import { cashCheckOut } from "@/actions/cart.action";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { CartContext } from "@/provider/cart-provider";
import { ShippDataI } from "@/types/cart.type";
import { Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

export function CartCheckout() {
  const router = useRouter();

  const { cartId, getCartData } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm({
    defaultValues: {
      shippingAddress: {
        details: "",
        phone: "",
        city: "",
        postalCode: "",
      },
    },
  });

  async function handleCheckout(data: ShippDataI) {
    try {
      setIsLoading(true)
      const response = await cashCheckOut(data, cartId);
      if (response.status === "success") {
        getCartData();
        console.log(response);
        toast.success(response.message, {
          duration: 2000,
          position: "top-right",
        });
        router.push("/products");
      }
    } catch (error) {
      console.log(error);
      toast.error((error as Error).message, {
        duration: 3000,
        position: "top-right",
      });
    }finally{
       setIsLoading(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-full bg-green-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-green-700 transition-all flex items-center justify-center gap-3 shadow-lg shadow-green-600/20 active:scale-[0.98] cursor-pointer">
          <Lock className="w-4 h-4" />
          Secure Checkout
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Cart Payment</DialogTitle>
          <DialogDescription>
            Please fill this form in order to checkout
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(handleCheckout)}
          className="space-y-4 mt-2"
        >
          <Controller
            name="shippingAddress.details"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Details</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="text"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter details"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="shippingAddress.phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Phone</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="tel"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter phone number"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="shippingAddress.city"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>City</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="text"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter city"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="shippingAddress.postalCode"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Postal Code</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="text"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter postal code"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full bg-[#16a34a] text-white hover:bg-[#15803d] mt-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? <svg
          className="animate-spin w-5 h-5 text-white"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            className="opacity-40"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8z"
          />
        </svg>:  form.formState.isSubmitting ? "Processing..." : "Checkout"}
           
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
