from django.urls import path;
from . import views


urlpatterns=[
    path("",view=views.getRoutes,name="routes"),
    path("notes/",view=views.getNotes,name="notes"),
    path("notes/create/",view=views.createNote,name="create-note"),
    path("notes/<int:pk>/update/",view=views.updateNote,name="update-note"),
    path("notes/<int:pk>/delete/",view=views.deleteNote,name="delete-note"),
    path("notes/<int:pk>/",view=views.getNote,name="note"),
    
    # Authentication
  
]