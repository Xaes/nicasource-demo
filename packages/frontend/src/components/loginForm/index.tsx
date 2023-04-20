import { ReactElement } from "react";
import useForm, { validateEmail } from "../../hooks/useForm";
import { ArrowPathIcon } from "@heroicons/react/20/solid";

const RegisterForm = (): ReactElement => {
    const { registerValue, submit, loading, items } = useForm({
        items: {
            name: { required: true, },
            email: {
                required: true,
                validate: {
                    fn: ({  value }) => validateEmail(value)
                }
            },
            password: { required: true }
        },
        onSubmit: async ({ items }) => {
            console.log("login, hehe");
        }
    })

    return (
        <form
            role="form"
            className="space-y-8"
            onSubmit={(event) => event.preventDefault()}
        >
            <fieldset className="space-y-6">
                <label>
                    <span>Email:</span>
                    <input
                        placeholder="diego@xaes.dev"
                        type="text"
                        value={items.email.value as string}
                        onChange={({ target }) => registerValue("email", target.value)}
                    />
                    {items.email.hasError && ( <span className="form-error">A valid email is required.</span> )}
                </label>
                <label>
                    <span>Password:</span>
                    <input
                        placeholder="Password"
                        type="password"
                        value={items.password.value as string}
                        onChange={({ target }) => registerValue("password", target.value)}
                    />
                    {items.password.hasError && ( <span className="form-error">Password is required.</span> )}
                </label>
            </fieldset>
            <button
                disabled={loading}
                className="button button-primary w-full"
                type="submit"
            >
                <span className="flex items-center justify-center">
                    {loading ? (<ArrowPathIcon className="w-4 h-4 animate-spin text-white mr-2" />) : undefined}
                    <span>Login</span>
                </span>
            </button>
        </form>
    )
}

export default RegisterForm;
