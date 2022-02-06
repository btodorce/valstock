import { Button } from "../";
import { Formik, Form, Field } from "formik";
import { useTranslation } from "../../hooks";
import styles from "./LoginForm.module.scss";
import { FC, HTMLInputTypeAttribute } from "react";
import * as Yup from "yup";
import classNames from "classnames";

interface P {
    onLogin: (username: string, password: string) => Promise<void>;
}

interface FormValues {
    email: string;
    password: string;
}

export const LoginForm: FC<P> = ({ onLogin, children, ...props }) => {
    const { _ } = useTranslation();

    const validationSchema: Yup.SchemaOf<FormValues> = Yup.object({
        email: Yup.string().email().required(_("login.username-required")),
        password: Yup.string().required(_("login.password-required")).min(1)
    });

    const defaultFormikValues: FormValues = {
        email: "",
        password: ""
    };

    const renderInputLabel = ({ error }) => (
        <div className="formError">
            <p>{error}</p>
        </div>
    );

    const renderFormStyles = (className: string, { touched, error }) =>
        classNames(className, touched && error ? styles.formError : "");

    const renderFormField = (
        name: string,
        placeholder: string,
        type: HTMLInputTypeAttribute,
        { field, meta: { touched, error } }
    ) => (
        <div className={styles.inputWrapper}>
            <p>
                <label className={styles.label}>{name}</label>
            </p>
            <input
                className={renderFormStyles(styles.inputField, {
                    touched,
                    error
                })}
                placeholder={placeholder}
                type={type}
                {...field}
            />
            {touched &&
                error &&
                renderInputLabel({
                    error
                })}
        </div>
    );

    return (
        <div style={props} className={styles.loginForm}>
            <Formik
                initialValues={defaultFormikValues}
                enableReinitialize={true}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) => {
                    const { email, password } = values;
                    onLogin(email, password).then(() => resetForm());
                }}
            >
                {({ isValid, isSubmitting }) => (
                    <div className={styles.wrapper}>
                        <Form>
                            {children}
                            <Field name="email">
                                {({ field, meta: { touched, error } }) => (
                                    <div className={styles.inputWrapper}>
                                        <p>
                                            <label className={styles.label}>
                                                {_("login.username")}
                                            </label>
                                        </p>
                                        <input
                                            className={renderFormStyles(
                                                styles.inputField,
                                                { touched, error }
                                            )}
                                            placeholder={_(
                                                "placeholder.username"
                                            )}
                                            type="text"
                                            {...field}
                                        />
                                        {touched &&
                                            error &&
                                            renderInputLabel({
                                                error
                                            })}
                                    </div>
                                )}
                            </Field>
                            <Field name="password">
                                {({ field, meta: { touched, error } }) => (
                                    <div className={styles.inputWrapper}>
                                        <p>
                                            <label className={styles.label}>
                                                {_("login.password")}
                                            </label>{" "}
                                        </p>
                                        <input
                                            className={renderFormStyles(
                                                styles.inputField,
                                                { touched, error }
                                            )}
                                            type="password"
                                            autoFocus
                                            placeholder={_(
                                                "placeholder.password"
                                            )}
                                            {...field}
                                        />
                                        {touched &&
                                            error &&
                                            renderInputLabel({
                                                error
                                            })}
                                    </div>
                                )}
                            </Field>
                            <Button
                                type="submit"
                                disabled={!isValid || isSubmitting}
                            >
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
