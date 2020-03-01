import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import WithSpinner from "../with-spiner/with-spinner.component";
import { selectIsCollectionFetching } from "../../redux/shop/shop.selectors";
import CollectionOverview from './collections-overview.component';
import { compose } from "redux";

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsCollectionFetching
})

const CollectionOverviewContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionOverview);

export default CollectionOverviewContainer;