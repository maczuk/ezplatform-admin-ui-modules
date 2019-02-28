import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '../list-item/list.item.component';

const List = ({ items, loadMoreSubitems, currentLocationId, path, subitemsLoadLimit, isParentInvisible }) => {
    const listAttrs = { loadMoreSubitems, currentLocationId, subitemsLoadLimit };
    const listItemAttrs = { loadMoreSubitems };

    return (
        <ul className="c-list">
            {items.map((item) => {
                const hasPreviousPath = path && path.length;
                const itemPath = `${hasPreviousPath ? path + ',' : ''}${item.locationId}`;
                const { subitems } = item;

                return (
                    <ListItem
                        {...item}
                        {...listItemAttrs}
                        key={item.locationId}
                        selected={item.locationId === currentLocationId}
                        subitemsLoadLimit={subitemsLoadLimit}
                        isParentInvisible={isParentInvisible}
                        path={itemPath}>
                        {subitems.length ? <List path={itemPath} items={subitems} isParentInvisible={item.isInvisible} {...listAttrs} /> : null}
                    </ListItem>
                );
            })}
        </ul>
    );
};

List.propTypes = {
    path: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
    loadMoreSubitems: PropTypes.func.isRequired,
    currentLocationId: PropTypes.number.isRequired,
    isParentInvisible: PropTypes.bool.isRequired,
    subitemsLoadLimit: PropTypes.number,
};

export default List;
