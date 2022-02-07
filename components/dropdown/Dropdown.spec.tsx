import { render } from "@testing-library/react";
import renderer from "react-test-renderer";
import Dropdown from "./Dropdown";

const defaultProps = {
    title: "Dropdown title",
    children: (
        <ul>
            <li>Test</li>
            <li>Test 2</li>
        </ul>
    )
};

describe("Button", () => {
    it("should render successfully", () => {
        const tree = renderer.create(<Dropdown {...defaultProps} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
