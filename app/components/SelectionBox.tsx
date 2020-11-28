import { Flex } from "theme-ui"
import Icon from "react-icons-kit"
import { arrowLeft } from "react-icons-kit/fa/arrowLeft"

interface SelectionBoxProps {}

export default function SelectionBox(props: SelectionBoxProps) {
  return (
    <Flex
      sx={{
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "primary",
        width: 250,
        paddingX: 1,
        borderRadius: 7,
        boxShadow: "default",
        justifyContent: "space-between",
        svg: {
          fill: "primary",
        },
      }}
    >
      خطة الدفع
      <Icon icon={arrowLeft} />
    </Flex>
  )
}
