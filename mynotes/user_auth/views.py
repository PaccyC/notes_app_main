
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication,TokenAuthentication
from rest_framework.decorators import permission_classes,authentication_classes

from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404
from .serializers import UserSerializer
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework import status
from rest_framework.response import Response

# Create your views here.
   
@api_view(["POST"])
def signup(request):
    data=request.data
    serializer=UserSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        user=User.objects.get(username=request.data["username"])
        
        user.set_password(request.data["password"])
        user.save()
        token=Token.objects.create(user=user)
        
    
        return Response({"token":token.key,"user":serializer.data})
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    
@api_view(["POST"])
def login(request):
    user= get_object_or_404(User,username=request.data["username"])
    if not user.check_password(request.data["password"]):
        return Response({"detail":"Not Found"},status=status.HTTP_404_NOT_FOUND)
    token,created=Token.objects.get_or_create(user=user)
    serializer=UserSerializer(instance=user)
    return Response({"token":token.key,"user":serializer.data})


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([SessionAuthentication,TokenAuthentication])
def test_token(request):
        return Response("Passed for {}".format(request.user.username))
            
            
            
@api_view(["POST"])  
@permission_classes([IsAuthenticated] )         
def logout(request):
    request.auth.delete()
    return  Response("Successfully logged out",status=status.HTTP_200_OK)