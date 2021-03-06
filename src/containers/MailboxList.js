import React from 'react'
import { connect } from 'react-redux'
import MailboxListItem from './MailboxListItem'
import Icon from '../components/Icon'
import Spinner from '../components/Spinner'
import Select from './Select'
import { setProvider } from '../actions/providers'
import './mailboxlist.scss'

class MailboxList extends React.Component {
  constructor () {
    super()
    this.getMailboxes = this.getMailboxes.bind(this)
  }
  getMailboxes (boxes) {
    return boxes.map((b, i) => {
      return <MailboxListItem key={b.path} {...b} />
    })
  }
  getProvider ({ item, index }) {
    return (
      <div className='flex-container provider-item'>
        <Icon icon={item.icon} />
        <div className='stack flex'>
          <span>{item.name}</span>
          <span className='address'>{item.address}</span>
        </div>
      </div>
    )
  }
  render () {
    return <div className='flex-container flex-vertical mailbox-list'>
      <Select
        items={this.props.providers}
        itemRenderer={this.getProvider}
        activeIndex={this.props.providers.findIndex(x => x.id === this.props.activeProvider)}
        placeholder='Select mailbox'
        onChange={(i) => this.props.dispatch(setProvider(this.props.providers[i].id))} />

      {!this.props.mailboxes.length && <div className='flex flex-container flex-center'><Spinner /></div>}
      {this.props.mailboxes.length &&
        <ul className='flex'>
          {this.getMailboxes(this.props.mailboxes)}
        </ul>
      }
    </div>
  }
}

const mapStateToProps = ({ providers, mailboxes }) => {
  return {
    providers: providers.connected,
    mailboxes: mailboxes[providers.active] ? mailboxes[providers.active] : [],
    activeProvider: providers.active
  }
}

export default connect(mapStateToProps)(MailboxList)
