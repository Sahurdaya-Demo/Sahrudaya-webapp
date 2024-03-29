from django.contrib import admin
from django.urls import path, include
from account.views import SendPasswordResetEmailView, UserChangePasswordView, UserLoginView, UserProfileView, UserRegistrationView, UserPasswordResetView,UserLogout,SendRegisterEmail,EmailSearch
from django.conf import settings
from employee.views import EmpView,ValidPost,ValidGet,GetCount
from consellor.views import submitview,emailchange,demo
from django.conf.urls.static import static
from rest_framework import routers
route=routers.DefaultRouter()
route.register("",EmpView,basename='Employee')
route2=routers.DefaultRouter()
route2.register("",submitview,basename='Counselor')
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/',include(route.urls)),
    # path('send-mail/',ContactMail.as_view(),name='contact-mail'),
    path('send-resgister-email/', SendRegisterEmail.as_view(), name='send-reset-password-email'),
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('emailsearch/', EmailSearch.as_view(), name='register'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('logout/', UserLogout.as_view(), name='logout'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('changepassword/', UserChangePasswordView.as_view(), name='changepassword'),
    path('send-reset-password-email/', SendPasswordResetEmailView.as_view(), name='send-reset-password-email'),
    path('reset-password/<uid>/<token>/', UserPasswordResetView.as_view(), name='reset-password'),
    path('validpost',ValidPost.as_view(),name='validpost'),
    path('validget',ValidGet.as_view(),name='validget'),
    path('formsubmit/',include(route2.urls),name='formsubmit'),
    path('emailchange/',emailchange.as_view(),name='emailchange'),
    path('demo/',GetCount.as_view(),name='demo')
]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
