from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from . serialisers import *
from django.contrib.auth.models import User

# Create your views here.
@api_view(['GET'])
def homeView(request):
    res = {
        "message":"Welcome to our Todo API Endpoints"
    }
    return Response(res, status=status.HTTP_200_OK)

@api_view(['GET','POST'])
def todoView(request):
    if request.method == 'GET':
        all_todo = Todo.objects.all()
        serialiser = TodoSerialiser(all_todo, many=True)
        return Response(serialiser.data, status=status.HTTP_200_OK)
    else:
        data = request.data
        serialiser = TodoSerialiser(data = data)
        if serialiser.is_valid():
            serialiser.save()
            return Response(serialiser.data, status=status.HTTP_200_OK)
        return Response(serialiser.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET','PUT','DELETE'])
def todoDetailView(request, id):
    try:
        todo = Todo.objects.get(pk=id)
    except Todo.DoesNotExist as e:
        return Response({'msg':f'Error {e}'}, 
            status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serialiser = TodoSerialiser(todo)
        return Response(serialiser.data, status=status.HTTP_200_OK)
    
    elif request.method == 'PUT':
        data = request.data
        serialiser = TodoSerialiser(todo, data=data, partial = True)
        if serialiser.is_valid():
            serialiser.save()
            return Response(serialiser.data, status=status.HTTP_200_OK)
        return Response(serialiser.errors, status=status.HTTP_400_BAD_REQUEST)
    
    else:
        name = todo.name
        todo.delete()
        msg = f"{name} has been deleted successfully"
        return Response({'msg':msg}, status=status.HTTP_404_NOT_FOUND)