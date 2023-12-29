// import AttachMoneyIcon from '@mui/icons-material/AttachMoney'

export const Money = props => {
  const { money } = props
  return (
    <span>
      {/* <AttachMoneyIcon /> */}${money}
    </span>
  )
}
