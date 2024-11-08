// @ts-nocheck2

export const KianazTable = props => {
  const { tableHeader, tableHeaderWidths, tableRows, selectedItems, setSelectedItems } = props

  return (
    <div>
      <div className='table-container'>
        <table className='table'>
          <thead>
            <tr>
              {tableHeader.map(header => {
                const { name, icon, title, component, width, position, resizable } = header

                const realWidth = tableHeaderWidths[name]
                const minWidth = realWidth || width.min
                const maxWidth = realWidth || width.max
                return (
                  <th key={name} style={{ minWidth, maxWidth }}>
                    {icon} {title}
                    {component && component}
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {tableRows.map(tableRow => {
              return (
                <tr key={tableRow.id}>
                  {tableRow.map(tableData => {
                    const { cellComponent, cellName } = tableData

                    return <td key={tableData.name}>{cellComponent}</td>
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
