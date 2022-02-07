import { render } from "@testing-library/react";
import renderer from "react-test-renderer";

import Button from "./Button";

const defaultProps = {
    loading: false
};

describe("Button", () => {
    it("should render successfully", () => {
        const tree = renderer.create(<Button {...defaultProps} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
