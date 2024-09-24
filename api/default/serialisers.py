from rest_framework import serializers
from . models import *

class TodoSerialiser(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = "__all__"