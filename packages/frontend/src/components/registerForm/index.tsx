import { ReactElement, useState } from "react";
import useForm, { validateEmail } from "../../hooks/useForm";
import { register } from "../../services/auth";
import { ArrowPathIcon } from "@heroicons/react/20/solid";
import { APIErrorResponse } from "../../types";
import { useNavigate } from "react-router-dom";

interface Props {
    onSuccess: () => void
}

const RegisterForm = (props: Props): ReactElement => {
    const navigate = useNavigate();
    const [error, setError] = useState<APIErrorResponse | undefined>(undefined);

    const { registerValue, loading, submit, items } = useForm({
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
            try {
                setError(undefined);
                await register({
                    creator: {
                        email: items.email.value as string,
                        name: items.name.value as string
                    },
                    credential: {
                        credentialType: "password",
                        credentialValue: items.password.value as string
                    }
                });
                props.onSuccess();
            } catch (error) {
                setError(error as APIErrorResponse);
            }
        }
    })

    return (
        <form
            role="form"
            className="space-y-8"
            onSubmit={async (event) => {
                event.preventDefault();
                await submit();
            }}
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
                    <span>Name:</span>
                    <input
                        placeholder="Name"
                        type="text"
                        value={items.name.value as string}
                        onChange={({ target }) => registerValue("name", target.value)}
                    />
                    {items.name.hasError && ( <span className="form-error">Name is required.</span> )}
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
                {error ? (
                    <span className="form-error text-center w-full capitalize">{error.errorMessage}</span>
                ) : undefined}
            </fieldset>
            <button
                disabled={loading}
                className="button button-primary w-full"
                type="submit"
            >
                <span className="flex items-center justify-center">
                    {loading ? (<ArrowPathIcon className="w-4 h-4 animate-spin text-white mr-2" />) : undefined}
                    <span>Register</span>
                </span>
            </button>
        </form>
    )
}

export default RegisterForm;
