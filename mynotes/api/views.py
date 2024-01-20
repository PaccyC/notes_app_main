from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404
from .models import Note

from .serializers import NoteSerializer,UserSerializer
from django.contrib.auth.models import User

# testing token imports


# Create your views here.
@api_view(["GET"])
def getRoutes(request):
    
    return Response("Our Apis")
    
@api_view(["GET"])
def getNotes(request):
    notes=Note.objects.all().order_by("-updated")
    
    serializer=NoteSerializer(notes,many=True)
    
    return Response(serializer.data)    

@api_view(["GET"])
def getNote(request,pk):
    param=request.GET.get("id")
    note=Note.objects.get(id=pk)
    
    serializer=NoteSerializer(note)
    
    return Response(serializer.data)    

@api_view(["PUT"])
def updateNote(request,pk):
    data=request.data
    note= Note.objects.get(id=pk)
    serializer=NoteSerializer(instance=note,data=data)
    
    if serializer.is_valid():
        serializer.save()
    
    return Response(serializer.data)

@api_view(["DELETE"])
def deleteNote(request,pk):
    
    note= Note.objects.get(id=pk)
    note.delete()
    
    return Response("Note was successfully deleted")

@api_view(["POST"])
def createNote(request):
    data= request.data
    note=Note.objects.create(
        body=data["body"]
    )
    serializer=NoteSerializer(note,many=False)
    
    return Response(serializer.data)
    