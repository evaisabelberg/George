import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import ListContainer from '../../../atoms/ListContainer';
import ListItem from '@material-ui/core/ListItem';
import { setUserOrder } from '../../../../actions/actions';
import { connect } from 'react-redux';
import arrayMove from 'array-move';

const SortableItem = SortableElement(({value}) => {
    return (
        <ListItem>{value.location}</ListItem>
    );
});

const SortableList = SortableContainer(({items}) => {
  return (
    <ListContainer>
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
    </ListContainer>
  );
});

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: this.props.items
        }
    }
  state = {
    items: []
  };
  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState(({items}) => ({
      items: arrayMove(items, oldIndex, newIndex),
    }));
    const user = this.props.user.username;
    this.props.setUserOrder(user, this.state.items);
  };
  render() {
    const { items } = this.state;
    return <SortableList items={items} onSortEnd={this.onSortEnd} />;
  }
}

List.propTypes = {
    items: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps, { setUserOrder })(List);
