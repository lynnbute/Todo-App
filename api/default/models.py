from django.db import models

# Create your models here.
class Todo(models.Model):
    name = models.CharField(max_length=300, default="")
    description = models.TextField()
    status = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name