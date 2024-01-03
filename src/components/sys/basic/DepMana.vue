<template>
    <div style="width: 500px">
        <el-input
            placeholder="输入部门进行搜索..."
            prefix-icon="el-icon-search"
            v-model="filterText">
        </el-input>

        <el-tree
            :data="deps"
            :props="defaultProps"
            default-expand-all
            :filter-node-method="filterNode"
            :expand-on-click-node="false"
            ref="tree">
            <span class="custom-tree-node" slot-scope="{ node, data }" style="display: flex;justify-content: space-between;width: 100%">
                <span>{{ data.name }}</span>
                <span>
                  <el-button
                      type="text"
                      size="mini"
                      class="depBtn"
                      @click="() => showAddDep(data)">
                    添加部门
                  </el-button>
                  <el-button
                      type="text"
                      size="mini"
                      class="depBtn"
                      @click="() => deleteDep(data)">
                    删除部门
                  </el-button>
                </span>
             </span>
        </el-tree>
    </div>
</template>

<script>
export default {
    name: "DepMana",
    data(){
        return{
            filterText:'',
            deps:[],
            defaultProps:{
                children:'children',
                label:'name'
            }
        }
    },
    watch: {
        filterText(val) {
            this.$refs.tree.filter(val);
        }
    },
    mounted() {
        this.initDeps();
    },
    methods:{
        showAddDep(data){
            console.log(data);
        },
        deleteDep(data){
            console.log(data);
        },
        initDeps(){
            this.getRequest('/system/basic/department/').then(resp=>{
                if(resp){
                    this.deps=resp;
                }
            })
        },
        filterNode(value, data) {
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
        }
    }
}
</script>

<style scoped>
    .depBtn{
        padding:2px;
    }
</style>