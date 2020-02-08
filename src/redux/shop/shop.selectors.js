import { createSelector } from "reselect";

const selectShop = state => state.shop

export const selectCollections = createSelector(
    [selectShop],
    (selectShop) => selectShop.collections
)

export const selectCollection = collectionUrlParam => 
    createSelector(
        [selectCollections],
        collections => collections[collectionUrlParam]
    )

export const selectCollectionForPreview = createSelector(
    [selectCollections],
    collections => Object.keys(collections).map(key => collections[key])
)