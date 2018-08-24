from rest_framework import serializers
from . import models
from todolist.users import models as user_models
from todolist.users.serializers import  (UserSerializer)

class ReferSerializer(serializers.ModelSerializer):

    """ Refer Serializer """
    creator = UserSerializer(read_only=True)
    class Meta: 
            model = models.Refer
            fields = (
                "id",
                'created_at',
                'updated_at',
                'before',
                'after',
                "useYn",
                'creator',
            )

class TodoSerializer(serializers.ModelSerializer):
    
    """ Todo Serializer """

    creator = UserSerializer(read_only=True)
    before = ReferSerializer(many=True)

    class Meta:
        model = models.Todo
        fields = (
            "id",
            'creator',
            'title',
            'status',
            'before',
            'created_at',
            'updated_at',
        )


class InputTodoSerializer(serializers.ModelSerializer):
    # creator = UserSerializer(read_only=True)
    class Meta:
        model = models.Todo
        fields = (
            'title',
        )