import { useTranslation } from "../../hooks";
import * as Yup from "yup";
import { Field, FieldArray, Form, Formik } from "formik";
import { Button } from "..";
import styles from "./Modal.module.scss";
import classnames from "classnames";
import { Album, Photo } from "../../types";
import ListItem from "../list-item/ListItem";

interface P {
    visible: boolean;
    albums: Album[];
    onSave: (album: FormValues) => void;
    onClose: () => void;
}

type FormValues = {
    action: string;
    title?: string;
    album?: string[];
};

enum ModalState {
    create = "create",
    add = "add"
}

enum Display {
    visible = "block",
    hidden = "hidden"
}

export const Modal = ({ albums, visible, onSave, onClose }: P): JSX.Element => {
    const { _ } = useTranslation();

    const validationSchema: Yup.SchemaOf<FormValues> = Yup.object({
        action: Yup.string().default(ModalState.create),
        title: Yup.string().when("action", {
            is: ModalState.create,
            then: Yup.string().required(_("login.album-name-required"))
        }),
        album: Yup.array().when("action", {
            is: ModalState.add,
            then: Yup.array().of(Yup.string()).required()
        })
    });

    const defaultFormikValues: FormValues = {
        action: ModalState.create,
        title: "",
        album: []
    };

    return (
        <div
            className={classnames(
                styles.container,
                visible ? Display.visible : Display.hidden
            )}
        >
            {visible && (
                <div className={styles.modal}>
                    <Formik
                        initialValues={defaultFormikValues}
                        enableReinitialize={true}
                        validationSchema={validationSchema}
                        onSubmit={values => {
                            onSave(values);
                            onClose();
                        }}
                        onReset={() => {
                            onClose();
                        }}
                    >
                        {({ isValid, setFieldValue, values }) => (
                            <Form>
                                <p className={styles.header}>
                                    <span
                                        className={
                                            values.action === ModalState.create
                                                ? ""
                                                : styles.toggled
                                        }
                                        onClick={() =>
                                            setFieldValue(
                                                "action",
                                                ModalState.create
                                            )
                                        }
                                    >
                                        {_("messages.create-new-album")}
                                    </span>
                                    <span
                                        onClick={() =>
                                            setFieldValue(
                                                "action",
                                                ModalState.add
                                            )
                                        }
                                        style={
                                            !albums
                                                ? {
                                                      pointerEvents: "none"
                                                  }
                                                : {}
                                        }
                                        className={
                                            values.action === ModalState.add
                                                ? ""
                                                : styles.toggled
                                        }
                                    >
                                        {_("messages.add-to-existing")}
                                    </span>
                                </p>
                                {values.action === ModalState.create && (
                                    <Field
                                        className={styles.content}
                                        type="text"
                                        placeholder={_(
                                            "messages.enter-title-here"
                                        )}
                                        name="title"
                                    />
                                )}
                                {values.action === ModalState.add && (
                                    <FieldArray
                                        name="album"
                                        render={arrayHelpers => (
                                            <div className={styles.content}>
                                                <ul>
                                                    {albums?.map(
                                                        (album, key) => (
                                                            <ListItem
                                                                id={key}
                                                                key={key}
                                                                item={album}
                                                                onSave={(
                                                                    index,
                                                                    value
                                                                ) =>
                                                                    arrayHelpers.insert(
                                                                        index,
                                                                        value
                                                                    )
                                                                }
                                                                onDelete={index =>
                                                                    arrayHelpers.remove(
                                                                        index
                                                                    )
                                                                }
                                                                selected={true}
                                                            />
                                                        )
                                                    )}
                                                </ul>
                                            </div>
                                        )}
                                    />
                                )}
                                <div>
                                    <Button type="reset">
                                        {_("messages.cancel")}
                                    </Button>
                                    <Button disabled={!isValid} type="submit">
                                        {_("messages.save")}
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            )}
        </div>
    );
};
