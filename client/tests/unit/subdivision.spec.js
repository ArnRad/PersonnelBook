import { mount } from '@vue/test-utils'
import SubDivision from '@/components/structureComponents/SubDivision'

const dataList = [
    {
        "_id":"6091710154600e44302dd6ff",
        "name":"WEB programuotojas",
        "division_id":{
           "_id":"609170e054600e44302dd6f9",
           "name":"Programavimo",
           "workplace_id":"6091703254600e44302dd6f7",
           "createdAt":"2021-05-04T16:05:52.783Z",
           "updatedAt":"2021-05-04T16:05:52.783Z",
           "__v":0
        },
        "workplace_id":{
           "_id":"6091703254600e44302dd6f7",
           "street":"Sukileliu pr.",
           "number":"11",
           "city":"Kaunas",
           "country":"Lietuva",
           "date":"2021-05-04T16:02:58.497Z",
           "__v":0
        },
        "createdAt":"2021-05-04T16:06:25.441Z",
        "updatedAt":"2021-05-04T16:06:25.441Z",
        "__v":0
     }
]

const wrapper = mount(SubDivision, {
  data() {
    return{
        SubDivisions: dataList
    }
  }
})

describe('SubDivisions list component test', () => {

  beforeEach(() => {
    jest.spyOn(console, 'error')
    console.error.mockImplementation(() => {})
  })
  
  afterEach(() => {
    console.error.mockRestore()
  })

  it('Display SubDivision information in table', () => {
    expect(wrapper.vm.SubDivisions[0].name).toBe("WEB programuotojas")
  })

  it('Display SubDivision nested Workplace information in table', () => {
    expect(wrapper.vm.SubDivisions[0].workplace_id.street).toBe("Sukileliu pr.")
  })

  it('Display SubDivision nested Division information in table', () => {
    expect(wrapper.vm.SubDivisions[0].division_id.name).toBe("Programavimo")
  })


  it('Add subdivision button exist', () => {
    const input = wrapper.find(".button-add")
    expect(input.exists()).toBe(true)
  })

  it('Open subdivision add modal form when add button is triggered', async () => {
    wrapper.setMethods({ toggleViewForm:jest.fn() })
    await wrapper.find(".button-add").trigger('click')
    expect(wrapper.vm.toggleViewForm).toHaveBeenCalledTimes(1)
  })

  it('Edit subdivision button exist', () => {
    const input = wrapper.find(".edit-btn")
    expect(input.exists()).toBe(true)
  })

  it('Open subdivision edit modal form when edit button is triggered', async () => {
    wrapper.setMethods({ toggleViewForm:jest.fn() })
    await wrapper.find(".edit-btn").trigger('click')
    expect(wrapper.vm.toggleViewForm).toHaveBeenCalledTimes(1)
  })

  it('Delete subdivision button exist', () => {
    const input = wrapper.find(".delete-btn")
    expect(input.exists()).toBe(true)
  })

  it('Delete subdivision when delete button is triggered', async () => {
    wrapper.setMethods({ deleteSubDivision:jest.fn() })
    await wrapper.find(".delete-btn").trigger('click')
    expect(wrapper.vm.deleteSubDivision).toHaveBeenCalledTimes(1)
  })
  
})
