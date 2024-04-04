from rest_framework.response import Response
from rest_framework import status,permissions
from rest_framework.views import APIView
from account.serializers import SendPasswordResetEmailSerializer, UserChangePasswordSerializer, UserLoginSerializer, UserPasswordResetSerializer, UserProfileSerializer, UserRegistrationSerializer
from django.contrib.auth import authenticate,logout
# from account.renderers import UserRenderer
from employee.models import employee
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from .models import User

# from rest_framework_simplejwt.authentication import JWTAuthentication
# from rest_framework_simplejwt.token_blacklist.models import \
# OutstandingToken, BlacklistedToken
from employee.serializers import EmpSerializer
from consellor.models import counsellor
from consellor.serializers import CounsellorSerializer
from ptsessions.models import ptsessions
from ptsessions.serializers import SessionSerializer
import secrets
import string
from account.utils import Util

# Generate Token Manually
def get_tokens_for_user(user):
  refresh = RefreshToken.for_user(user)
  return {
      'refresh': str(refresh),
      'access': str(refresh.access_token),
  }

class EmailSearch(APIView):
  def post(self,request):
    # print(request.data['email'])
    if User.objects.filter(email=request.data['email']).exists():
      return Response({'msg': 'email found'}, status=status.HTTP_200_OK)
    else:
      return Response({'errors': 'email not found'}, status=status.HTTP_200_OK)
  
class UserRegistrationView(APIView):
  # renderer_classes = [UserRenderer]
  def post(self, request, format=None):
    # try:
      serializer = UserRegistrationSerializer(data=request.data)
      serialized = EmpSerializer(data=request.data)
      serializer.is_valid(raise_exception=True)
      serialized.is_valid(raise_exception=True)
      user = serializer.save()
      serialized.save()
      token = get_tokens_for_user(user)
      return Response({'token':token, 'msg':'Registration Successful'}, status=status.HTTP_201_CREATED)
    # except:
    #   return Response({'errors': 'same email'}, status=status.HTTP_200_OK)

class SendRegisterEmail(APIView):
  # renderer_classes = [UserRenderer]
  def post(self, request, format=None):
    user=request.data['email']
    secure_str = ''.join((secrets.choice(string.ascii_letters) for i in range(20)))
    link = f'https://sahrudaya-webapp.vercel.app/registration/{secure_str}'
    body = 'Click Following Link to Register '+link
    data = {
        'subject':'Registration',
        'body':body,
        'to_email':user
    }
    Util.send_email(data)
    return Response({'msg':'Password Reset link send. Please check your Email'}, status=status.HTTP_200_OK)
    # try:
    #   serializer = SendPasswordResetEmailSerializer(data=request.data)
    #   print(request.data)
    #   serializer.is_valid(raise_exception=True)
    #   return Response({'msg':'Password Reset link send. Please check your Email'}, status=status.HTTP_200_OK)
    # except:
    #   return Response({'errors': 'email not found'}, status=status.HTTP_200_OK)
      

class UserLoginView(APIView):
  # renderer_classes = [UserRenderer]
  def post(self, request, format=None):
    serializer = UserLoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    if User.objects.filter(email=serializer.data.get('email')).exists():
     email = serializer.data.get('email')
     password = serializer.data.get('password')
     type = User.objects.get(email=email)
     user = authenticate(email=email, password=password)
     if user is not None:
       token = get_tokens_for_user(user)
       return Response({'token':token,'type':str(type.type), 'name':str(type.name),'msg':'Login Success'}, status=status.HTTP_200_OK)
     else:
       return Response({'errors':{'non_field_errors':['Password is not Valid']}}, status=status.HTTP_200_OK)
    else:
      return Response({'errors':{'non_field_errors':['Email does not exist']}}, status=status.HTTP_200_OK)

class UserProfileView(APIView):
  # renderer_classes = [UserRenderer]
  permission_classes = [IsAuthenticated]
  def get(self, request, format=None):
    jj=employee.objects.filter(email=request.user)
    serialized=EmpSerializer(jj,many=True)
    pp=counsellor.objects.filter(email=request.user)
    serial=CounsellorSerializer(pp,many=True)
    xx=ptsessions.objects.filter(email=request.user)
    serialzer=SessionSerializer(xx,many=True)
    # serializer = UserProfileSerializer(request.user)
    return Response([serialized.data,serial.data,serialzer.data], status=status.HTTP_200_OK)
class UserLogout(APIView):
   authentication_classes = ()
  #  permission_classes = [IsAuthenticated]
   def post(self, request):
      try:
        # print(request.data['refresh'])
        refresh_token = request.data['refresh']
        # OutstandingToken.objects.filter(token=refresh_token).delete()
        # RefreshToken(refresh_token).blacklist()
        return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)
      except KeyError:
        return Response({'error': 'refresh_token key not found'}, status=status.HTTP_400_BAD_REQUEST)
        
class UserChangePasswordView(APIView):
  # renderer_classes = [UserRenderer]
  permission_classes = [IsAuthenticated]
  def post(self, request, format=None):
    serializer = UserChangePasswordSerializer(data=request.data, context={'user':request.user})
    serializer.is_valid(raise_exception=True)
    return Response({'msg':'Password Changed Successfully'}, status=status.HTTP_200_OK)

class SendPasswordResetEmailView(APIView):
  # renderer_classes = [UserRenderer]
  def post(self, request, format=None):
    try:
      serializer = SendPasswordResetEmailSerializer(data=request.data)
      print(request.data)
      serializer.is_valid(raise_exception=True)
      return Response({'msg':'Password Reset link send. Please check your Email'}, status=status.HTTP_200_OK)
    except:
      return Response({'errors': 'email not found'}, status=status.HTTP_200_OK)
class UserPasswordResetView(APIView):
  # renderer_classes = [UserRenderer]
  def post(self, request, uid, token, format=None):
    try:
      serializer = UserPasswordResetSerializer(data=request.data, context={'uid':uid, 'token':token})
      serializer.is_valid(raise_exception=True)
      return Response({'msg':'Password Reset Successfully'}, status=status.HTTP_200_OK)
    except:
      return Response({'errors': 'Pass and crpwd not match'}, status=status.HTTP_400_BAD_REQUEST)

class DisableUser(APIView):
  # renderer_classes = [UserRenderer]
  def post(self, request,format=None):
    try:
      user=User.objects.get(email=request.data['email'])
      usere=employee.objects.get(email=request.data['email'])
      if(user.is_active==True):
        user.is_active=False
        usere.is_active=False
        user.save()
        usere.save()
        return Response({'msg': 'Disabled'}, status=status.HTTP_200_OK)
      else:
        user.is_active=True
        usere.is_active=True
        user.save()
        usere.save()
        return Response({'msg': 'Enabled'}, status=status.HTTP_200_OK)
    except:
      return Response({'errors': 'Pass and crpwd not match'}, status=status.HTTP_400_BAD_REQUEST)


