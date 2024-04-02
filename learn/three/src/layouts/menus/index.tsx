import { Tabs, type TabsProps } from "antd";
import { Testpage } from "../../views";
const Testpages: TabsProps["items"] = [  {
  key: "1",
  label: `Testpage`,
  children: <Testpage />,
}]


const items = [
  {
    key: "1",
    label: `threejs`,
    children: (
      <div>
        <Tabs
          tabPosition="left"
          defaultActiveKey="1"
          items={Testpages}
        />
      </div>
    ),
  }]
  export default items
