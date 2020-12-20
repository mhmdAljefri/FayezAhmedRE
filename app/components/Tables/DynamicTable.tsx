/* eslint-disable react/jsx-pascal-case */
import React, { ReactNode } from "react"
import get from "lodash/get"
import { Button, Card, Flex, Styled } from "theme-ui"
import { Icon } from "react-icons-kit"
import { chevronRight } from "react-icons-kit/fa/chevronRight"
import { chevronLeft } from "react-icons-kit/fa/chevronLeft"

/**
 * Dynamci table will take to main props
 * as @argument {headers, data}
 * header is the header of the table which containg of this
 * keys {
 *   name: 'is the name of column',
 *   key: is the record key,
 *   render: is function it's @argument { record }
 *     for example render: (record) => <a href={record.id}/>
 *   if render key present? no need to add key at header
 *   props: is the coumn props like className ...etc {}
 *   tdProps: props for table data
 * }
 */

const NoData = ({ length, fetching, message }) => (
  <tbody>
    <tr>
      <Styled.td colSpan={length} className="p-3 text-muted text-center">
        {fetching ? "Loading" : message || "لاتوجد بيانات"}
      </Styled.td>
    </tr>
  </tbody>
)

const Data = ({ data, headers }) => (
  <tbody>
    {data.map((record, index) => (
      <tr key={index}>
        {headers.map((head, nested_index) => (
          <td {...head.tdProps} key={`${index}-${nested_index}`}>
            {head.render ? head.render(record, index) : get(record, head.key)}
          </td>
        ))}
      </tr>
    ))}
  </tbody>
)

export default function DynamicTable({
  headers,
  data,
  message,
  fetching,
  onNext,
  onPrev,
  hasMore,
  tableHeader,
  tableActions,
}: DynamicTableProps) {
  return (
    <Card
      sx={{
        backgroundColor: "background",
        borderRadius: "default",
        padding: 3,
        boxShadow: "card",
        overflow: "auto",
      }}
    >
      <Card className="border-0 d-flex justify-content-between">
        <h3 className="mb-0">{tableHeader}</h3>
        <div>{tableActions}</div>
      </Card>
      <Styled.table>
        <thead>
          <tr>
            {headers.map((head, index) => (
              <Styled.th {...head.props} key={index}>
                {head.name}
              </Styled.th>
            ))}
          </tr>
        </thead>
        {data.length <= 0 && (
          <NoData length={headers.length} message={message} fetching={fetching} />
        )}
        <Data data={data} headers={headers} />
      </Styled.table>

      <Card className="py-4">
        <nav aria-label="...">
          <Flex>
            <Button
              variant="link"
              onClick={(e) => {
                e.preventDefault()
                onPrev()
              }}
              role="button"
              tabIndex={-1}
            >
              <Icon icon={chevronRight} />
            </Button>
            <Button
              variant="link"
              onClick={(e) => {
                e.preventDefault()
                if (hasMore) onNext()
              }}
            >
              <Icon icon={chevronLeft} />
            </Button>
          </Flex>
        </nav>
      </Card>
    </Card>
  )
}

DynamicTable.defaultProps = {
  totalPages: 0,
  currentPage: 0,
}

type DynamicTableProps = {
  headers: {
    name: string
    key?: string
    props?: any
    render?: (args: any) => any
  }[]
  hasMore: boolean
  tableHeader?: string
  tableActions?: ReactNode
  data: any[]
  fetching?: boolean
  message?: string
  onNext: () => any
  onPrev: () => any
}
