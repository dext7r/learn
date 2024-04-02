import { Tabs } from "antd";
import { FC, useState } from "react";
interface Tab  {
  key: string;
  label: React.ReactNode;
}
interface LayoutsProps {
  items: Tab[]
}
const Layouts: FC<LayoutsProps> = ({items}) => {
  const [key, setKye] = useState("1");
  return (
    <div style={{ padding: 20 }}>
    <Tabs activeKey={key} items={items} onChange={(key) => setKye(key)} />
  </div>
  )
}
export default Layouts
