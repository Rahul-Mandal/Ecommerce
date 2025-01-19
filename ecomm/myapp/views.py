from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.token_blacklist.models import BlacklistedToken,OutstandingToken


class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        print(username, password)
        if not username or not password:
            raise AuthenticationFailed('Username or password not provided')
        
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            raise AuthenticationFailed('User not found')
        
        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password')

        # Generate JWT Token
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)

        return Response({'access': access_token, 'refresh': str(refresh)}, status=status.HTTP_200_OK)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            # Get the refresh token from the request
            refresh_token = request.data.get('refresh_token')

            if refresh_token:
                print(refresh_token)
                token = RefreshToken(refresh_token)
                # Retrieve the OutstandingToken corresponding to the refresh token
                outstanding_token = OutstandingToken.objects.get(token=token)

                # Create the BlacklistedToken instance and associate it with the OutstandingToken
                BlacklistedToken.objects.create(token=outstanding_token)
                # token = RefreshToken(refresh_token)
                # BlacklistedToken.objects.create(token=token)

                # # token.blacklist()  # Blacklist the refresh token (using simplejwt's blacklist feature)
            
            return Response({"message": "Logout successful"}, status=200)

        except Exception as e:
            return Response({"error": str(e)}, status=400)