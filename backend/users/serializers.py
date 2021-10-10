from rest_framework import serializers
from .models import UserModel

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ('id','username','email','phone','password')
        extra_kwargs = {'password':{'write_only':True}}
    
    def create(self,validated_data):
        password = validated_data.pop('password')
        user = self.Meta.model(**validated_data)
        if password is not None:
            user.set_password(password)
            user.save()
            return user
        else:
            raise ValueError("Password is Required")


