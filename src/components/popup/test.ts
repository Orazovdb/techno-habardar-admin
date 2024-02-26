<script setup lang="ts">
  import { ref, watch, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useI18n } from 'vue-i18n'

  import ArticleNote from '@/components/article/ArticleNote.vue'
  import ArticleHead from '@/components/article/ArticleHead.vue'
  import ArticleTextarea from '@/components/article/ArticleTextarea.vue'
  import ArticleInfo from '@/components/article/ArticleInfo.vue'
  import ArticleCategories from '@/components/article/ArticleCategories.vue'
  import ArticleTabBar from '@/components/article/ArticleTabBar.vue'
  import ArticleSliderUploader from '@/components/article/ArticleSliderUploader.vue'
  import ArticleVideoUploader from '@/components/article/ArticleVideoUploader.vue'
  import ArticleImageUploader from '@/components/article/ArticleImageUploader.vue'
  import ArticlePlan from '@/components/article/ArticlePlan.vue'
  import ArticleEditStatus from '@/components/ArticleEditStatus.vue'
  import Editor from '@/components/article/Editor.vue'
  import EditorTable from '@/components/article/EditorTable.vue'
  import PopUpConfirm from '@/components/PopUpConfirm.vue'

  import { ARTICLE_STATUS } from '@/utils/constants'
  import { getDateTime, joinName } from '@/utils/helpers'
  import type { InformationList, Menu } from '@/types/base'

  import {
    GET_ARTICLE,
    UPDATE_ARTICLE,
    GET_CONTENT,
    UPDATE_CONTENT,
    UPDATE_STATUS,
    UPLOAD_VIDEO,
    UPLOAD_CONTENT_VIDEO,
    IMAGE_UPLOAD
  } from '../api/article'
  import { GET_CATEGORY } from '../api/category'

  const { locale, t } = useI18n()

  const route = useRoute()
  const router = useRouter()

  const tabs = ref([
    { id: 'PHOTO', name: 'photo' },
    { id: 'VIDEO', name: 'video' }
  ]) as any

  const selectedTab = ref(tabs.value[0]) as any

  const editorStatus = ref('SAVED')

  const selectTab = (tab: any) => {
    selectedTab.value = tab
    article.value.main_type = tab.id
  }

  const articleStatus = ref({
    uuid: route.params.article,
    status: 'EMPTY',
    publication_date: ''
  })

  const article = ref({
    uuid: '',
    title: '',
    description: '',
    tag: '',
    author_name: '',
    main_type: 'PHOTO',
    note: '',
    category_id: [],
    published_date: '',
    main_photo: {
      author: '',
      description: '',
      photo: [] as string[]
    },
    main_video: {
      author: '',
      description: '',
      poster: '',
      video_path: '',
      duration: '',
      cutting_error: false,
      cutting_status: false
    }
  })

  const menu = ref<Menu[]>([
    { id: 0, title: 'returnToCorrection' },
    { id: 1, title: 'planningPublication' }
  ])

  const articleInfo = ref<InformationList[]>([])
  const getArticle = async () => {
    try {
      const { data } = await GET_ARTICLE({ uuid: route.params.article })

      article.value = {
        uuid: data.uuid,
        title: data.title || '',
        description: data.description || '',
        tag: data.tag || '',
        author_name: data.author_name || '',
        main_type: data.main_type || 'PHOTO',
        note: data.note || '',
        category_id: [],
        published_date: data.published_date || '',
        main_photo: {
          author: data.main_photo?.author || '',
          description: data.main_photo?.description || '',
          photo: data.main_photo?.photo || []
        },
        main_video: {
          author: data.main_video?.author || '',
          description: data.main_video?.description || '',
          poster: data.main_video?.poster || '',
          video_path: data.main_video?.video_path || '',
          duration: data.main_video?.duration || '',
          cutting_error: data.main_video?.cutting_error || false,
          cutting_status: data.main_video?.cutting_status || false
        }
      }
      articleStatus.value = {
        uuid: route.params.article,
        status: data.status,
        publication_date: data.publication_date
      }

      data.main_video?.video_path && (mainVideoProgress.value = 101)

      selectedTab.value = article.value.main_type === 'PHOTO' ? tabs.value[0] : tabs.value[1]

      article.value.category_id =
        data.category?.map((category: any) => {
          selectedCategories.value.push({
            category_slug: category.category_slug,
            name:
              locale === 'tm'
                ? category.parent_name_tm
                : category.parent_name_ru
                ? `${locale === 'tm' ? category.parent_name_tm : category.parent_name_ru}/${
                    locale === 'tm' ? category.name_tm : category.name_ru
                  }`
                : locale === 'tm'
                ? category.name_tm
                : category.name_ru
          })

          return category.category_id
        }) || []

      const gaveInfo = []
      if (data.gave_task && data.gave_task_date) {
        gaveInfo.push({ key: 'gaveTask', value: joinName(data.gave_task) })
        gaveInfo.push({ key: 'gaveTaskDate', value: getDateTime(data.gave_task_date) })
      }

      const creatorInfo = [
        { key: 'creator', value: joinName(data.creator) },
        { key: 'createdDate', value: getDateTime(data.created_at) }
      ]
      articleInfo.value = [creatorInfo, gaveInfo]
    } catch (error) {
      console.error(error)
    }
  }

  const updateStatus = async () => {
    try {
      const { data } = await UPDATE_STATUS({
        data: articleStatus.value
      })
      console.log(data)

      router.go(-1)
    } catch (error) {
      console.error(error)
    }
  }
  const publishArticle = () => {
    articleStatus.value.status = ARTICLE_STATUS.PUBLISHED
    articleStatus.value.publication_date = ''

    updateStatus()
  }

  const cancelPublishArticle = () => {
    articleStatus.value.status = ARTICLE_STATUS.WAITING
    articleStatus.value.publication_date = ''

    updateStatus()
  }

  const updateArticle = async () => {
    try {
      editorStatus.value = 'SAVING'
      await UPDATE_ARTICLE({
        data: {
          ...article.value,
          category_id: article.value.category_id.length ? article.value.category_id : null
        }
      })
      editorStatus.value = 'SAVED'
    } catch (error) {
      console.error(error)
      editorStatus.value = 'ERROR'
    }
  }

  const categories = ref<any>([])
  const getCategories = async () => {
    try {
      const { data } = await GET_CATEGORY()
      categories.value = data || []
    } catch (error) {
      console.error(error)
    }
  }

  const selectedCategories = ref<any>([])
  const selectCategory = (category: any) => {
    selectedCategories.value.push({
      category_slug: category.category_slug,
      name: locale === 'tm' ? category.name_tm : category.name_ru
    })
    article.value.category_id = selectedCategories.value.map((category: any) => category.category_slug)
  }

  const deleteCategory = (category: any) => {
    selectedCategories.value = selectedCategories.value.filter(
      (cat: any) => cat.category_slug !== category.category_slug
    )
    article.value.category_id = selectedCategories.value.map((category: any) => category.category_slug)
  }

  const changeMainPhoto = async (files: FileList) => {
    for (let index = 0; index < files.length; index++) {
      const image = await updateImage(files[index])
      article.value.main_photo.photo.push(image)
    }
  }

  const changeMainPosterFile = async (file: File) => {
    const image = await updateImage(file)
    article.value.main_video.poster = image
  }

  const mainVideoProgress = ref(0)
  const changeMainVideoFile = async (file: File) => {
    const onUploadProgress = {
      onUploadProgress: (progressEvent: any) => {
        mainVideoProgress.value = Math.round((progressEvent.loaded * 1000) / progressEvent.total) / 10
      }
    }
    const data = await uploadVideo(file, onUploadProgress, 'main')
    mainVideoProgress.value = 101

    if (data.status === 'SUCCESS') {
      article.value.main_video.video_path = data.video_path
      article.value.main_video.cutting_error = data.cutting_error
      article.value.main_video.cutting_status = data.cutting_status
    }
  }

  const getVideoStatus = (videoData: any) => {
    if (videoData.cutting_error === false && videoData.cutting_status === false && !videoData.video_path) {
      return 'EMPTY'
    }
    if (videoData.cutting_error === true) {
      return 'ERROR'
    }
    if (videoData.cutting_status === false) {
      return 'DONE'
    }
    return 'CUTTING'
  }

  const uploadVideo = async (file: File, onUploadProgress: any, mainContent: string) => {
    try {
      const formData = {
        dat: {
          video: file
        },
        onUploadProgress
      }

      const { data } = await (mainContent === 'content' ? UPLOAD_CONTENT_VIDEO(formData) : UPLOAD_VIDEO(formData))
      return {
        status: 'SUCCESS',
        ...data
      }
    } catch (error) {
      console.error(error)
      return {
        status: 'ERROR'
      }
    }
  }

  const updateImage = async (file: File): Promise<string> => {
    try {
      const { data } = await IMAGE_UPLOAD({
        data: {
          image: file
        }
      })
      return data.image_path_original.toString()
    } catch (error) {
      console.error(error)
      return ''
    }
  }
  const content = ref([
    {
      type: 'TEXT',
      content: '<p></p>',
      order_number: 1
    }
  ]) as any

  const contentDeletable = ref([]) as any

  const getContent = async () => {
    try {
      const { data } = await GET_CONTENT({ uuid: route.params.article })
      if (data.content_dto) {
        normalizeContent(data.content_dto)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const normalizeContent = (content_dto: any) => {
    const newContent = content_dto
      .sort((a: any, b: any) => a.order_number - b.order_number)
      .map((contentItem: any) => {
        contentItem.method = 'UPDATE'
        return contentItem
      })

    if (JSON.stringify(newContent) !== JSON.stringify(content.value)) {
      content.value = newContent
    }
  }

  const updateContent = async (): Promise<any> => {
    try {
      editorStatus.value = 'SAVING'
      const { data } = await UPDATE_CONTENT({
        data: {
          slug_lang_id: route.params.article,
          content_dto: [...content.value, ...contentDeletable.value]
        }
      })
      if (data.content_dto) {
        contentDeletable.value = []
        normalizeContent(data.content_dto)
      }
      editorStatus.value = 'SAVED'
    } catch (error) {
      console.error(error)
      editorStatus.value = 'ERROR'
    }
  }

  const updatePositions = () => {
    for (let position = 1; position <= content.value.length; position++) {
      content.value[position - 1].order_number = position
    }
  }

  const createTable = (index: number) => {
    const [before, after] = content.value[index].content.split('<hr>')

    if (before === '' || before === '<p></p>') {
      contentDeletable.value.push({
        uuid: content.value[index].uuid,
        type: 'TEXT',
        method: 'DELETE'
      })
      content.value[index] = {
        type: 'TABLE',
        content: `<table><tbody><tr><td></td><td></td><td></td></tr></tbody></table>`,
        order_number: 0
      }
      content.value.splice(index + 1, 0, {
        type: 'TEXT',
        content: after || '<p></p>',
        order_number: 0
      })
    } else {
      content.value[index].content = before

      content.value.splice(index + 1, 0, {
        type: 'TABLE',
        content: `<table><tbody><tr><td></td><td></td><td></td></tr></tbody></table>`,
        order_number: 0
      })

      content.value.splice(index + 2, 0, {
        type: 'TEXT',
        content: after || '<p></p>',
        order_number: 0
      })
    }
    updatePositions()
  }

  // const selectDeleteTable = (index: number) => {
  //   openConfirmPopUp('TABLE', index)
  // }

  const deleteTable = (index: number) => {
    contentDeletable.value.push({
      uuid: content.value[index].uuid,
      type: 'TABLE',
      method: 'DELETE'
    })
    content.value.splice(index, 1)
    joinContent(index)
    updatePositions()
  }

  const createImage = (index: number) => {
    const [before, after] = content.value[index].content.split('<hr>')

    if (before === '' || before === '<p></p>') {
      contentDeletable.value.push({
        uuid: content.value[index].uuid,
        type: 'TEXT',
        method: 'DELETE'
      })
      content.value[index] = {
        type: 'PHOTO',
        content: {
          author: '',
          description: '',
          photo: ''
        },
        order_number: 0
      }
      content.value.splice(index + 1, 0, {
        type: 'TEXT',
        content: after || '<p></p>',
        order_number: 0
      })
    } else {
      content.value[index].content = before

      content.value.splice(index + 1, 0, {
        type: 'PHOTO',
        content: {
          author: '',
          description: '',
          photo: ''
        },
        order_number: 0
      })

      content.value.splice(index + 2, 0, {
        type: 'TEXT',
        content: after || '<p></p>',
        order_number: 0
      })
    }
    updatePositions()
  }

  // const selectDeleteImage = (index: number) => {
  //   openConfirmPopUp('PHOTO', index)
  // }

  const deleteImage = (index: number) => {
    contentDeletable.value.push({
      uuid: content.value[index].uuid,
      type: 'PHOTO',
      method: 'DELETE'
    })
    content.value.splice(index, 1)
    joinContent(index)
    updatePositions()
  }

  const changeContentPhoto = async (index: number, file: File) => {
    const image = await updateImage(file)
    content.value[index].content.photo = image
  }

  const createVideo = (index: number) => {
    const [before, after] = content.value[index].content.split('<hr>')

    if (before === '' || before === '<p></p>') {
      contentDeletable.value.push({
        uuid: content.value[index].uuid,
        type: 'TEXT',
        method: 'DELETE'
      })
      content.value[index] = {
        type: 'VIDEO',
        content: {
          author: '',
          description: '',
          poster: '',
          video_path: '',
          duration: '',
          cutting_error: false,
          cutting_status: false
        },
        order_number: 0
      }
      content.value.splice(index + 1, 0, {
        type: 'TEXT',
        content: after || '<p></p>',
        order_number: 0
      })
    } else {
      content.value[index].content = before

      content.value.splice(index + 1, 0, {
        type: 'VIDEO',
        content: {
          author: '',
          description: '',
          poster: '',
          video_path: '',
          duration: '',
          cutting_error: false,
          cutting_status: false
        },
        order_number: 0
      })
      content.value.splice(index + 2, 0, {
        type: 'TEXT',
        content: after || '<p></p>',
        order_number: 0
      })
    }
    updatePositions()
  }

  const selectDeleteVideo = (index: number) => {
    openConfirmPopUp('VIDEO', index)
  }

  const deleteVideo = (index: number) => {
    contentDeletable.value.push({
      uuid: content.value[index].uuid,
      type: 'VIDEO',
      method: 'DELETE'
    })
    content.value.splice(index, 1)
    joinContent(index)
    updatePositions()
  }

  const changeContentPoster = async (index: number, file: File) => {
    const image = await updateImage(file)
    content.value[index].content.poster = image
  }

  const contentVideoProgress = ref<any>({})
  const changeContentVideo = async (index: number, file: File) => {
    const onUploadProgress = {
      onUploadProgress: (progressEvent: any) => {
        contentVideoProgress.value[index] = Math.round((progressEvent.loaded * 1000) / progressEvent.total) / 10
      }
    }
    const data = await uploadVideo(file, onUploadProgress, 'content')
    contentVideoProgress.value[index] = 101
    if (data.status === 'SUCCESS') {
      content.value[index].content.video_path = data.video_path
      content.value[index].content.cutting_error = data.cutting_error
      content.value[index].content.cutting_status = data.cutting_status
    }
  }

  const joinContent = (index: number) => {
    if (content.value[index]?.type === 'TEXT' && content.value[index - 1]?.type === 'TEXT') {
      content.value[index - 1].content += content.value[index].content
      contentDeletable.value.push({
        uuid: content.value[index].uuid,
        type: 'TEXT',
        method: 'DELETE'
      })
      content.value.splice(index, 1)
    }
  }

  const showPlanCalendar = ref(false)
  const openPlanCalendar = () => {
    showPlanCalendar.value = true
  }
  const closePlanCalendar = () => {
    showPlanCalendar.value = false
  }

  const cancelPlanArticle = () => {
    articleStatus.value.status = ARTICLE_STATUS.WAITING
    articleStatus.value.publication_date = ''

    updateStatus()
  }
  const sendToWaitList = () => {
    articleStatus.value.status = ARTICLE_STATUS.WAITING
    articleStatus.value.publication_date = ''
    updateStatus()
  }

  const selectPlanArticle = ({ date, time }: any) => {
    articleStatus.value.status = ARTICLE_STATUS.PLANNING
    articleStatus.value.publication_date = `${date} ${time}`
    updateStatus()
    closePlanCalendar()
  }

  const showConfirmPopUp = ref(false)
  const selectedConfirm = ref({
    type: '',
    index: 0
  })
  const openConfirmPopUp = (type: string, index: number) => {
    selectedConfirm.value = {
      type,
      index
    }
    showConfirmPopUp.value = true
  }

  const closeConfirmPopUp = () => {
    showConfirmPopUp.value = false
  }

  const deleteMainPhoto = (idx: number) => {
    article.value.main_photo.photo.splice(idx, 1)
  }

  const confirmDelete = async () => {
    switch (selectedConfirm.value.type) {
      case 'TABLE':
        deleteTable(selectedConfirm.value.index)
        break
      case 'PHOTO':
        deleteImage(selectedConfirm.value.index)
        break
      case 'VIDEO':
        deleteVideo(selectedConfirm.value.index)
    }
    closeConfirmPopUp()
  }

  const selectItem = (item: any) => {
    switch (item.id) {
      case 0:
        cancelPublishArticle()
        break
      case 1:
        openPlanCalendar()
        break
    }
  }

  const articleMainTimeout = ref<any>(null)
  const contentTimeout = ref<any>(null)

  onMounted(async () => {
    await getContent()
    await getArticle()
    await getCategories()

    watch(
      () => article.value,
      () => {
        editorStatus.value = 'WRITING'
        clearTimeout(articleMainTimeout.value)
        articleMainTimeout.value = setTimeout(() => {
          updateArticle()
        }, 2000)
      },
      { deep: true }
    )
    watch(
      () => content.value,
      () => {
        editorStatus.value = 'WRITING'
        clearTimeout(contentTimeout.value)
        contentTimeout.value = setTimeout(() => {
          updateContent()
        }, 2000)
      },
      { deep: true }
    )
  })
</script>