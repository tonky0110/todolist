from django.contrib import admin
from . import models
# Register your models here.


@admin.register(models.Todo)
class TodoAdmin(admin.ModelAdmin):

    list_filter = (
        'title',
        'created_at',
        'updated_at'
    )

    list_display_links = (
        'title',
    )

    list_display = (
        'id',
        'title',
        'creator',
        'created_at',
        'updated_at',
    )


@admin.register(models.Refer)
class TodoAdmin(admin.ModelAdmin):

    search_fields = (
        'before',
    )

    list_display_links = (
        'before',
        'after',
    )

    list_display = (
        'id',
        'before',
        'after',
    )
