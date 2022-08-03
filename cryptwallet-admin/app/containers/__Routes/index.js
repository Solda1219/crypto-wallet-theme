import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from 'containers/_PrivateRoute';
import PublicRoute from 'containers/_PublicRoute';

// Private components
import Dashboard from 'containers/Dashboard/Loadable'
import UserComponent from 'containers/UserComponent/Loadable'
import PendingIdVarification from 'containers/PendingIdVarification/Loadable'
import IdVarification from 'containers/IdVarification/Loadable'
import UserWalletList from 'containers/UserWalletList/Loadable'
import UserWalletTransaction from 'containers/UserWalletTransaction/Loadable'
import UserProfile from 'containers/UserProfile/Loadable'
import UserProfileEdit from 'containers/UserProfileEidt/Loadable'
// import NodeHistory from 'containers/NodeHistory/Loadable'
import WalletList from 'containers/WalletList/Loadable'
import AllTransaction from 'containers/AllTransaction/Loadable'
import PendingWithdrawal from 'containers/PendingWithdrawal/Loadable'
import BuyCoinOrderList from 'containers/BuyCoinOrderList/Loadable'
import ProfileComponent from 'containers/ProfileComponent/Loadable'
import GeneralSetting from 'containers/GeneralSetting/Loadable'
import LandingPageSetting from 'containers/LandingPageSetting/Loadable'
import EditStaticContent from 'containers/EditStaticContent/Loadable'
import CustomPage from 'containers/CustomPage/Loadable'
import CustomPageAdd from 'containers/CustomPageAdd/Loadable'
import FaqsComponent from 'containers/FaqsComponent/Loadable'
import AddFaqs from 'containers/AddFaqs/Loadable'
import BulkEmail from 'containers/BulkEmail/Loadable'
import WithdrawalHistory from 'containers/WithdrawalHistory/Loadable'
import Transaction from 'containers/Transaction/Loadable'
const Routes = () => {
    return (
        <Switch>
            <PrivateRoute
                exact
                path="/"
                component={Dashboard}
                titles={['Dashboard']}
            />
            <PrivateRoute
                exact
                path="/user"
                component={UserComponent}
                titles={['User management', 'User']}
            />
            <PrivateRoute
                exact
                path="/pending-id-varification"
                component={PendingIdVarification}
                titles={['Reports', ' KYC Pending']}
            />
            <PrivateRoute
                exact
                path="/id-varification/:id"
                component={IdVarification}
                titles={['User management', ' Pending ID varification']}
            />
            <PrivateRoute
                exact
                path="/user-wallet-list/:id"
                component={UserWalletList}
                titles={['User', 'Wallet List']}
            />
            <PrivateRoute
                exact
                path="/user-wallet-list/user-wallet-transaction/:id"
                component={UserWalletTransaction}
                titles={['Wallet List', 'Wallet Transaction']}
            />
            <PrivateRoute
                exact
                path="/user-profile/:id"
                component={UserProfile}
                titles={['User', 'User Profile']}
            />
            <PrivateRoute
                exact
                path="/user-profile-edit/:id"
                component={UserProfileEdit}
                titles={['User', 'User Profile Edit']}
            />
            {/* <PrivateRoute
                exact
                path="/node-history"
                component={NodeHistory}
                titles={['Crypt wallet', 'Node history']}
            /> */}
            <PrivateRoute
                exact
                path="/user-wallets"
                component={WalletList}
                titles={['Crypt wallet', 'User wallets']}
            />
            <PrivateRoute
                exact
                path="/all-transaction/:id"
                component={AllTransaction}
                titles={['Crypt wallet', 'All transaction']}
            />
            <PrivateRoute
                exact
                path="/pending-withdrawal"
                component={PendingWithdrawal}
                titles={['Crypt wallet', 'Pending Withdrawal']}
            />
            <PrivateRoute
                exact
                path="/order-list"
                component={BuyCoinOrderList}
                titles={['Order List']}
            />
            <PrivateRoute
                exact
                path="/profile"
                component={ProfileComponent}
                titles={['Profile']}
            />
            <PrivateRoute
                exact
                path="/general-settings"
                component={GeneralSetting}
                titles={['Settings ', 'General settings']}
            />
            <PrivateRoute
                exact
                path="/landing-page"
                component={LandingPageSetting}
                titles={['Settings ', 'Landing Page']}
            />
            <PrivateRoute
                exact
                path="/static-content-edit/:id"
                component={EditStaticContent}
                titles={['Settings ', 'Add Static Content']}
            />
            <PrivateRoute
                exact
                path="/custom-page"
                component={CustomPage}
                titles={['Settings ', 'Custom Page']}
            />
            <PrivateRoute
                exact
                path="/custom-page-add"
                component={CustomPageAdd}
                titles={['Custom Page ', 'Add Custom Page']}
            />
            <PrivateRoute
                exact
                path="/faqs"
                component={FaqsComponent}
                titles={['Settings ', 'FAQs']}
            />
            <PrivateRoute
                exact
                path="/add-faqs"
                component={AddFaqs}
                titles={['FAQs ', 'Add FAQs']}
            />
            <PrivateRoute
                exact
                path="/bulk-email"
                component={BulkEmail}
                titles={['Settings ', 'Bulk Email']}
            />
            <PrivateRoute
                exact
                path="/withdrawal-history"
                component={WithdrawalHistory}
                titles={['Reports ', 'Withdrawal History']}
            />
            <PrivateRoute
                exact
                path="/transaction"
                component={Transaction}
                titles={['Reports ', 'All Transaction']}
            />
        </Switch>
    );
}
export default Routes