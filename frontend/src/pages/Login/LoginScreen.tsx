import React from "react";
import { Loader2 } from "lucide-react";
import { Button } from "src/components/ui/button";
import { Input } from "src/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "src/components/ui/form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "src/components/ui/card";

import useViewModel from './useViewModel'

const formSchema = z.object({
  email: z
    .string({ required_error: "El email es requerido." })
    .email("Este no es un mail valido."),
  password: z.string({ required_error: "La clave es requerida." }),
});

const Login = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isLoading, error, onLogin } = useViewModel()

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    onLogin(values.email, values.password)
  };

  return (
    <div className="flex h-screen w-screen">
      <div className="grid m-auto gap-3 justify-center">
        <Card style={{ width: "400px", maxWidth: "80%", margin: "auto" }}>
          <CardHeader>
            <CardTitle>Iniciar sesion</CardTitle>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          required
                          placeholder="example@email.com"
                          {...field}
                          type="email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Clave</FormLabel>
                      <FormControl>
                        <Input required type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="w-full" type="submit" disabled={isLoading}>
                  {isLoading  && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Iniciar sesion
                </Button>

                {error && <FormMessage>{error.message}</FormMessage>}
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
