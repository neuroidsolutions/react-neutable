import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'

class ReactNeuTable extends Component {
  static propTypes = {
    heading: PropTypes.arrayOf(
      PropTypes.exact({
        name: PropTypes.string.isRequired,
        type: PropTypes.oneOf(['number', 'string']).isRequired,
        key: PropTypes.string.isRequired
      })
    ).isRequired,
    tableName: PropTypes.string.isRequired,
    rows: PropTypes.array.isRequired
  };
  constructor(props) {
    super(props)
    this.state = {
      activeItem: '',
      sort: true,
      active: true,
      items: []
    }
  }

  sort = tableHead => {
    const { activeItem } = this.state
    const sort = activeItem === tableHead.name ? !this.state.sort : true
    let sortedItems = []
    if (tableHead.type === 'string') {
      const property = sort ? tableHead.key : `-${tableHead.key}`
      sortedItems = this.props.rows.sort(this.dynamicSort(property))
    } else {
      const items = this.props.rows.sort((a, b) => a - b)
      const beforeSort = [...items]
      sortedItems = sort ? beforeSort : beforeSort.reverse()
    }

    this.setState({
      sort: sort,
      activeItem: tableHead.name,
      items: sortedItems
    })
  };

  dynamicSort = property => {
    let sortOrder = 1
    if (property[0] === '-') {
      sortOrder = -1
      property = property.substr(1)
    }
    return function(a, b) {
      if (sortOrder === -1) {
        return b[property].localeCompare(a[property])
      } else {
        return a[property].localeCompare(b[property])
      }
    }
  };

  render() {
    const { heading, tableName, rows } = this.props
    const { sort, activeItem, items } = this.state
    const ascSort = [styles.i, styles.down].join(' ')
    const descSort = [styles.i, styles.up].join(' ')
    const activeClass = sort === true ? ascSort : descSort
    const rowElements = activeItem === '' ? rows : items
    return (
      <table className={styles.table}>
        <thead>
          <tr>
            {heading.map((tableHead, index) => {
              return (
                <th
                  key={`ReactNeuTable_tableHead_${tableName}_${index}`}
                  className={styles.theadTh}
                  onClick={() => {
                    this.sort(tableHead)
                  }}
                >
                  <span>{tableHead.name}</span>
                  <i
                    className={activeClass}
                    style={{
                      visibility: activeItem === tableHead.name ? 'visible' : null
                    }}
                  />
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {rowElements.map((rowElement, index) => {
            return (
              <tr key={`ReactNeuTable_tr_${tableName}_${index}`}>
                {heading.map((headItem, rowKeyIndex) => {
                  return (
                    <td
                      key={`ReactNeuTable_rowKeys_${tableName}_${rowKeyIndex}`}
                    >
                      {rowElement[headItem.key]}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }
}
ReactNeuTable.defaultProps = {
  tableName: `ReactNeuTable_${Math.random() * 100}`
}
export default ReactNeuTable
