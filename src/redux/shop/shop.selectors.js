import { createSelector } from "reselect";

const selectShop = state => state.shop

export const selectCollections = createSelector(
    [selectShop],
    (selectShop) => selectShop.collections
)

export const selectCollection = collectionUrlParam => 
    createSelector(
        [selectCollections],
        collections => collections? collections[collectionUrlParam] : null
    )

export const selectCollectionForPreview = createSelector(
    [selectCollections],
    collections => collections? Object.keys(collections).map(key => collections[key]) : []
)