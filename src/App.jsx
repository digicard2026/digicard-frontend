import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import ForgotPage from './pages/Authentication/ForgotPage'
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Setting from './pages/Setting';
import User from './pages/User';
import MyProfile from './pages/MyProfile';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';

import CartList from './pages/CartList';
import UserListForm from './pages/UserListForm';
import Manage from './pages/Inventory/Manage';
import Inventory2 from './pages/Inventory/Inventory2';
import Wallet from './pages/Wallet';
import SetRoute from './pages/SetRoute';
import Archive from './pages/Archive';
import Purchase from './pages/Inventory/Purchase';

import Payment from './pages/Payment';
import MyOrder from './pages/MyOrder';
import EmailVerify from './pages/Authentication/EmailVerify';
import EmailRegistration from './pages/Authentication/EmailRegistration';
import ActivityLog from './pages/ActivityLog';
import Transaction from './pages/Transaction';
import ApiCredential from './pages/ApiCrendetial';
import CdirReport from './pages/CdrReport';
import SetNewPassword from './pages/Authentication/SetNewPassword';
import KycVerification from './pages/KycVerification';
import KycNotVerified from './pages/KycNotVerified';
import KycSubmitted from './pages/KycSubmitted';
import VbList from './pages/VoiceBlast/VbList';
import Campaign from './pages/VoiceBlast/Campaign';
import AudioRec from './pages/VoiceBlast/AudioRec';
import AddVbList from './pages/VoiceBlast/AddVbList';
import AddCampaign from './pages/VoiceBlast/AddCampaign';
import AssociateCampaign from './pages/VoiceBlast/AssociateCampaign';
import Calls from './pages/Agent/Calls';
import Leads from './pages/Agent/Leads';
import LeadDetails from './pages/Agent/LeadDetails';

import ProtectedRoute from './utility/ProtectedRoute';
import LeadTabs from './pages/Agent/LeadTabs';
import Home from './pages/Home/Home';
import CreateCard from './pages/Card/CreateCard';
import PreviewCard from './pages/Card/PreviewCard';
import PublicCard from './pages/Card/PublicCard';
import PlanSelection from './pages/Card/PlanSelection';
import CardDashbord from './pages/Card/Card_Dashbord';
import RegistrationPage from './pages/Authentication/RegistrationPage';
import FranchiseSignIn from './pages/Authentication/FranchiseSignIn';
import FranchiseDashboard from './pages/Dashboard/FranchisedashBoard';
function App() {
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <Routes>
      {/* <Route
        index
        element={
          <>
            <PageTitle title="Sign in | UConnect Admin Dashboard" />
            <SignIn />
          </>
        }
      />
      <Route
            path="/calendar"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <PageTitle title="Calendar | UConnect Admin Dashboard" />
                <DefaultLayout>
                  <Calendar />
                </DefaultLayout>
              </ProtectedRoute>
            }
          />
      <Route
            path="/setting"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <PageTitle title="Setting | UConnect Admin Dashboard" />
                <DefaultLayout>
                  <Setting />
                </DefaultLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/user"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <PageTitle title="Users | UConnect Admin Dashboard" />
                <DefaultLayout>
                  <User />
                </DefaultLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/userListForm/:action/:user_id?"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <PageTitle title="UserListForm | UConnect Admin Dashboard" />
                <DefaultLayout>
                  <UserListForm />
                </DefaultLayout>
              </ProtectedRoute>
            }
          />
      <Route
        path="/apiCredential"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <PageTitle title="apiCredential | UConnect Admin Dashboard" />
            <DefaultLayout> <ApiCredential /></DefaultLayout> 
          </ProtectedRoute >
        }
      />
      <Route
        path="/cdrReport"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <PageTitle title="CDR | UConnect Admin Dashboard" />
            <DefaultLayout> <CdirReport /></DefaultLayout>            </ ProtectedRoute>
        }
      />
      <Route
        path="/ActivityLog"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <PageTitle title="ActivityLog | UConnect Admin Dashboard" />
            <DefaultLayout><ActivityLog /></DefaultLayout>

          </ ProtectedRoute>
        }
      />
      <Route
        path="/forms/form-elements"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <PageTitle title="Form Elements | UConnect Admin Dashboard" />
            <DefaultLayout><FormElements /></DefaultLayout>

          </ ProtectedRoute>
        }
      />
      <Route
        path="/forms/form-layout"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <PageTitle title="Form Layout | UConnect Admin Dashboard" />
            <DefaultLayout><FormLayout /></DefaultLayout>

          </ ProtectedRoute>
        }
      />
      <Route
        path="/tables"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <PageTitle title="Tables | UConnect Admin Dashboard" />
            <DefaultLayout><Tables /></DefaultLayout>

          </ ProtectedRoute>
        }
      />
      <Route
        path="/MyProfile"
        element={
          <>
            <PageTitle title="MyProfile | UConnect Admin Dashboard" />
            <DefaultLayout><MyProfile /></DefaultLayout>

          </>
        }
      />
      <Route
        path="/kycVerification"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <PageTitle title="KycVerification | UConnect Admin Dashboard" />
            <DefaultLayout><KycVerification /></DefaultLayout>

          </ ProtectedRoute>
        }
      />
      <Route
        path="/chart"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <PageTitle title="Basic Chart | UConnect Admin Dashboard" />
            <DefaultLayout><Chart /></DefaultLayout>

          </ ProtectedRoute>
        }
      />
      <Route
        path="/ui/alerts"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <PageTitle title="Alerts | UConnect Admin Dashboard" />
            <DefaultLayout><Alerts /></DefaultLayout>

          </ ProtectedRoute>
        }
      />
      <Route
        path="/ui/buttons"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <PageTitle title="Buttons | UConnect Admin Dashboard" />
            <DefaultLayout><Buttons /></DefaultLayout>

          </ ProtectedRoute >
        }
      />
      <Route
        path="/auth/signup"
        element={
          <>
            <PageTitle title="SignUp | UConnect Admin Dashboard" />
            <SignUp />

          </>
        }
      />
      <Route
        path="forgot"
        element={
          <>
            <PageTitle title="ForgotPage | UConnect Admin Dashboard" />
            <ForgotPage />

          </>
        }
      />
      <Route
        path="setNewPassword"
        element={
          <>
            <PageTitle title="SetNewPassword | UConnect Admin Dashboard" />
            <SetNewPassword />

          </>
        }
      />
      <Route
        path="/auth/EmailVerify/:token?"
        element={
          <>
            <PageTitle title="EmailVerify| UConnect Admin Dashboard" />
            <EmailVerify />

          </>
        }
      />
      <Route
        path="/auth/EmailRegistration"
        element={
          <>
            <PageTitle title="EmailRegistration| UConnect Admin Dashboard" />
            <EmailRegistration />

          </>
        }
      />
      <Route
        path="/auth/dashboard"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <PageTitle title="ecommers | UConnect Admin Dashboard" />
            <DefaultLayout> <ECommerce /></DefaultLayout>

          </ ProtectedRoute>
        }
      />
      <Route
        path="/manage"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <PageTitle title="Manage | UConnect Admin Dashboard" />
            <DefaultLayout><Manage /></DefaultLayout>

          </ ProtectedRoute >
        }
      />
      <Route
        path="/auth/cartlist"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <PageTitle title="Cart | UConnect Admin Dashboard" />
            <DefaultLayout><CartList /></DefaultLayout>

          </  ProtectedRoute>
        }
      />
      <Route
        path="/payment"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <PageTitle title="payment | UConnect Admin Dashboard" />
            <DefaultLayout><Payment /></DefaultLayout>

          </ ProtectedRoute>
        }
      />
      <Route
        path="/myOrder/:order_id?"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <PageTitle title="My Order | UConnect Admin Dashboard" />
            <DefaultLayout><MyOrder /></DefaultLayout>

          </ ProtectedRoute>
        }
      />
      <Route
        path="/inventory2"
        element={
          <ProtectedRoute allowedRoles={['admin']} >
            <PageTitle title="inventory2 | UConnect Admin Dashboard" />
            <DefaultLayout><Inventory2 /></DefaultLayout>

          </ ProtectedRoute>
        }
      />
      <Route
        path="/wallet"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <PageTitle title="Wallet | UConnect Admin Dashboard" />
            <DefaultLayout><Wallet /></DefaultLayout>

          </ ProtectedRoute>
        }
      />
      <Route
            path="/transaction"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <PageTitle title="Transaction | UConnect Admin Dashboard" />
                <DefaultLayout>
                  <Transaction />
                </DefaultLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/purchase"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <PageTitle title="Newtable | UConnect Admin Dashboard" />
                <DefaultLayout>
                  <Purchase />
                </DefaultLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/setroutes"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <PageTitle title="set routes | UConnect Admin Dashboard" />
                <DefaultLayout>
                  <SetRoute />
                </DefaultLayout>
              </ProtectedRoute>
            }
          />
      <Route
            path="/archive"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <PageTitle title="Archive | UConnect Admin Dashboard" />
                <DefaultLayout>
                  <Archive />
                </DefaultLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/kycnotverified"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <PageTitle title="Kyc Not Verified | UConnect Admin Dashboard" />
                <DefaultLayout>
                  <KycNotVerified />
                </DefaultLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/kycsubmitted"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <PageTitle title="Kyc submitted | UConnect Admin Dashboard" />
                <DefaultLayout>
                  <KycSubmitted />
                </DefaultLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/vblist"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <PageTitle title="V.B List | UConnect Admin Dashboard" />
                <DefaultLayout>
                  <VbList />
                </DefaultLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/campaign"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <PageTitle title="Campaign | UConnect Admin Dashboard" />
                <DefaultLayout>
                  <Campaign />
                </DefaultLayout>
              </ProtectedRoute>
            }
          />
      <Route
        path="/audiorecordings"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <PageTitle title="Audio Recordings | UConnect Admin Dashboard" />
            <DefaultLayout><AudioRec/></DefaultLayout>

          </ ProtectedRoute>
        }
      />
       <Route
        path="/addvblist"
        element={
          <ProtectedRoute allowedRoles={['admin']} >
            <PageTitle title="Add V.B List | UConnect Admin Dashboard" />
            <DefaultLayout> <AddVbList/>  </DefaultLayout>

          </ ProtectedRoute>
        }
      />
      <Route path="/addCampaign" 
      element={ 
      <ProtectedRoute allowedRoles={['admin']}>
        <PageTitle title="Add Campaign | UConnect Admin Dashboard" />
        <DefaultLayout><AddCampaign /></DefaultLayout>
      </ ProtectedRoute>
      }
      />
      <Route path="/associate-campaign/:listId" 
      element={ 
      <ProtectedRoute allowedRoles={['admin']}>
        <PageTitle title="Associate Campaign | UConnect Admin Dashboard" />
        <DefaultLayout><AssociateCampaign /></DefaultLayout>
      </ ProtectedRoute>
      }
      />
      <Route path="/calls"element={<ProtectedRoute allowedRoles={['agent']}> <PageTitle title="Calls | UConnect Admin Dashboard" /> <DefaultLayout><Calls /></DefaultLayout> </ ProtectedRoute>} />
      <Route path='/leads/:campaignId' element={<ProtectedRoute allowedRoles={['agent']}> <PageTitle title="Leads | UConnect Admin Dashboard" /> <DefaultLayout><Leads /></DefaultLayout> </ ProtectedRoute>} />
      <Route path='/leads/details/:_id' element={<ProtectedRoute allowedRoles={['agent']}> <PageTitle title="Details | UConnect Admin Dashboard" /> <DefaultLayout><LeadTabs /></DefaultLayout> </ ProtectedRoute>} /> */}
     
      <Route path="/" 
      element={ <>
       <PageTitle title="Home"/>
       <DefaultLayout>
        <Home />
        </DefaultLayout>
      </> 
      }
      />
      <Route path="/create" element={<DefaultLayout><CreateCard /></DefaultLayout>} />
      <Route path="/preview" element={ <DefaultLayout> <PreviewCard /> </DefaultLayout> } />
      <Route path="/card/public" element={<PublicCard />} />
      <Route path="/preview/:urlSlug" element={<PreviewCard />} />
       <Route path="/signin" element={<SignIn/>} />
      <Route path="/choose-plan" element={<PlanSelection />} />
      <Route path="/card-dashbord" element={<DefaultLayout>< CardDashbord/></DefaultLayout>} />
         <Route path="/signin/franchise" element={<FranchiseSignIn/>} />

          <Route
        path="forgot"
        element={
          <>
            <PageTitle title="ForgotPage | Digi_card Admin Dashboard" />
            <ForgotPage />
            

          </>
        }
      />
        <Route
        path="/reset-password"
        element={
          <>
            <PageTitle title="SetNewPassword | Digi_card Admin Dashboard" />
            <SetNewPassword />

          </>
        }
      />

        <Route
        path="/register"
        element={
          <>
            <PageTitle title="Registration Page" />
            <RegistrationPage/>

          </>
        }
      />

       <Route
        path="/signup"
        element={
          <>
            <PageTitle title="SignUp page" />
            <SignUp/>

          </>
        }
      />

      <Route
        path="/franchise/dashboard"
        element={
          <>
            <PageTitle title="Dashboard" />
            
             <DefaultLayout><FranchiseDashboard/></DefaultLayout>

          </>
        }
      />

    </Routes>

    



  );
}

export default App;
