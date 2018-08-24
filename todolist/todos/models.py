from django.contrib.auth.models import AbstractUser
from django.urls import reverse
from django.db import models
from django.utils.encoding import python_2_unicode_compatible
from django.utils.translation import ugettext_lazy as _
from django.contrib.humanize.templatetags.humanize import naturaltime
from todolist.users import models as user_models

# Create your models here.
class TimeStampedModel(models.Model):

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True



class Todo(TimeStampedModel):

    """ Todo Model """

    STATUS_CHOICES = (
        ('todo', 'Todo'),
        ('done', 'Done')
    )

    title = models.TextField()
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='todo')
    creator = models.ForeignKey(user_models.User, on_delete=models.PROTECT, null=True)

#    @property
#    def not_done_before_count(self):
#        return self.refers.filter(after).count()

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-created_at']


class Refer(TimeStampedModel):

    """ Refer Model """

    before = models.ForeignKey(Todo, on_delete=models.PROTECT, null=True, related_name="after")
    after  = models.ForeignKey(Todo, on_delete=models.PROTECT, null=True, related_name="before")
    useYn = models.BooleanField(default=True)
    creator = models.ForeignKey(user_models.User, on_delete=models.PROTECT, null=True)

    def ___str__(self):
        return 'before:{} - after:{}'.format(self.before.title, self.after.title)