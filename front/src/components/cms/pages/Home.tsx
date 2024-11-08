import { useMemo, useState } from 'react'

import { PageLayout } from '../templates/layouts/PageLayout'
import { CommentCell } from '../templates/table/CommentCell'
import { DateCell } from '../templates/table/DateCell'
import { KianazTable } from '../templates/table/KianazTable'
import { PaymentCell } from '../templates/table/PaymentCell'
import { TextCell } from '../templates/table/TextCell'
import { Fc, x } from '@faridsh69/usecrud'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import DateRangeIcon from '@mui/icons-material/DateRange'
import { Checkbox } from '@mui/material'
import { useAtom } from 'jotai'

import { Loading } from 'src/components/cms/molecules/Loading'
import { SocketLayout } from 'src/components/cms/templates/layouts/SocketLayout'
import { GameBoard } from 'src/components/game/templates/boards/GameBoard'
import { allTablesAtom } from 'src/contexts/allTablesAtom'

// 1 hover cell
// 2 scroll to specific row: today(index row)
// 3 resize width columns
// 4 position fixed vase 2 column aval
// 5 scroll to the left and right arrow icon
// 6 checkbox selection
// 7 virtualization

const TABLE_HEADER_POSITION = {
  fixed: 'fixed',
  scroll: 'scroll',
}

const Home = () => {
  const [allTables] = useAtom(allTablesAtom)

  const apiResponse = [
    {
      id: 1,
      date: new Date(),
      approval_status: 'production',
      comments: [{ id: 1, comment: 'comment 1' }],
      payment: 'in review',
      work_start: new Date(),
      work_end: new Date(),
      work_type: 'Work',
    },
    {
      id: 2,
      date: new Date(),
      approval_status: 'department',
      comments: [
        { id: 1, comment: 'comment 2' },
        { id: 2, comment: 'comment 4' },
      ],
      payment: 'Paid',
      work_start: new Date(),
      work_end: new Date(),
      work_type: 'Start work',
    },
  ]

  const tableHeaderWidths = {
    date: 170,
    payment: 240,
  }

  const tableRows = useMemo(() => {
    return apiResponse.map(record => {
      return [
        {
          cellName: 'comment',
          cellComponent: <CommentCell comments={record.comments} />,
        },
        {
          cellName: 'date',
          cellComponent: <DateCell date={record.date} />,
        },
        {
          cellName: 'approval',
          cellComponent: <PaymentCell text={record.payment} />,
        },
        {
          cellName: 'work-start',
          cellComponent: <DateCell date={record.work_start} />,
        },
        {
          cellName: 'work-end',
          cellComponent: <DateCell date={record.work_end} />,
        },
        {
          cellName: 'work-type',
          cellComponent: <TextCell text={record.work_type} />,
        },
      ]
    })
  }, [])

  const tableHeader = [
    {
      id: 1,
      name: 'select',
      component: <Checkbox />,
      position: TABLE_HEADER_POSITION.fixed,
      resizable: false,
      width: {
        min: 60,
        max: 60,
      },
    },
    {
      id: 2,
      name: 'comment',
      icon: <ChatBubbleOutlineIcon />,
      position: TABLE_HEADER_POSITION.fixed,
      resizable: false,
      width: {
        min: 100,
        max: 100,
      },
    },
    {
      id: 3,
      name: 'date',
      title: 'Date',
      icon: <DateRangeIcon />,
      position: TABLE_HEADER_POSITION.fixed,
      resizable: true,
      width: {
        min: 100,
        max: 200,
      },
    },
    {
      id: 4,
      name: 'approval',
      title: 'Approval Progress',
      position: TABLE_HEADER_POSITION.fixed,
      resizable: false,
      width: {
        min: 150,
        max: 150,
      },
    },
    {
      id: 5,
      name: 'payment',
      title: 'Payment',
      position: TABLE_HEADER_POSITION.scroll,
      resizable: true,
      width: {
        min: 150,
        max: 250,
      },
    },
    {
      id: 6,
      name: 'work-start',
      title: 'Work Start',
      position: TABLE_HEADER_POSITION.scroll,
      resizable: true,
      width: {
        min: 150,
        max: 250,
      },
    },
    {
      id: 7,
      name: 'work-end',
      title: 'Work End',
      position: TABLE_HEADER_POSITION.scroll,
      resizable: true,
      width: {
        min: 150,
        max: 250,
      },
    },
    {
      id: 8,
      name: 'work-type',
      title: 'Work Type',
      position: TABLE_HEADER_POSITION.scroll,
      resizable: true,
      width: {
        min: 150,
        max: 250,
      },
    },
  ]

  const [selectedItems, setSelectedItems] = useState([])

  console.log('2 x', x(5))

  return (
    // @ts-ignore
    <PageLayout>
      <div className='table-container'>
        <div>
          TESSSST <Fc label='XXXX' />
        </div>
        <KianazTable
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          tableHeader={tableHeader}
          tableRows={tableRows}
          tableHeaderWidths={tableHeaderWidths}
        />
        <div className='table'></div>
      </div>
      <SocketLayout>
        {!allTables.length && <Loading />}
        {!!allTables.length && <GameBoard />}
      </SocketLayout>
    </PageLayout>
  )
}

// eslint-disable-next-line import/no-default-export
export default Home
