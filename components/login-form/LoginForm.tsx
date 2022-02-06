import { Button } from "../";
import { Formik, Form, Field } from "formik";
import { useTranslation } from "../../hooks";
import styles from "./LoginForm.module.scss";
import { FC, useState } from "react";
import { object, SchemaOf, string } from "yup";

interface P {
    className?: "string";
    onLogin: (username: string, password: string) => Promise<void>;
}

enum InputField {
    password = "password",
    default = "text"
}

export const LoginForm: FC<P> = ({
    className,
    onLogin,
    children,
    ...props
}) => {
    const { _ } = useTranslation();
    const [inputFieldType, setInputFieldType] = useState<InputField>(
        InputField.default
    );

    const validationSchema = object({
        email: string().email().required(_("login.username-required")),
        password: string().required(_("login.password-required"))
    });

    const defaultFormikValues = {
        email: "val.stockski@valtech.com",
        password: ""
    };

    const handleInputFieldClick = () =>
        inputFieldType === InputField.default
            ? setInputFieldType(InputField.password)
            : setInputFieldType(InputField.default);

    return (
        <div className={className ?? ""} style={props}>
            <Formik
                initialValues={defaultFormikValues}
                enableReinitialize={true}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) => {
                    const { email, password } = values;
                    onLogin(email, password).then(() => resetForm());
                }}
            >
                {({ setFieldValue, resetForm, values }) => (
                    <div className={styles.wrapper}>
                        <Form>
                            {children}
                            <Field name="email">
                                {({
                                    field,
                                    form: { touched, errors },
                                    meta
                                }) => (
                                    <div>
                                        <p>
                                            <label className={styles.label}>
                                                {_("login.username")}
                                            </label>
                                        </p>
                                        <input
                                            className={styles.container}
                                            type="text"
                                            {...field}
                                        />
                                        {meta.touched && meta.error && (
                                            <div className="error">
                                                {meta.error}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </Field>
                            <Field name="password">
                                {({
                                    field,
                                    form: { touched, errors },
                                    meta
                                }) => (
                                    <div>
                                        <p>
                                            <label className={styles.label}>
                                                {_("login.password")}
                                            </label>{" "}
                                        </p>
                                        <input
                                            className={styles.container}
                                            type={inputFieldType}
                                            autoFocus
                                            onClick={() =>
                                                handleInputFieldClick()
                                            }
                                            placeholder={_(
                                                "login.password-default"
                                            )}
                                            {...field}
                                        />
                                        {meta.touched && meta.error && (
                                            <div className="error">
                                                {meta.error}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </Field>
                            <Button type="submit">
                                {_("login.button.submit")}
                            </Button>
                        </Form>
                    </div>
                )}
            </Formik>
        </div>
    );
};

LoginForm.displayName = "LoginForm";
export default LoginForm;
