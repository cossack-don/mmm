<template>
   <Page 
   :isLoading="false" 
   :isError="false" 
   :isEmptyContent="false"
   >
    <template #error>
        error content
    </template>
        
     <template #fullContent>
        <div>full-data</div>
      </template>
 
      <template #emptyContent>
          <div>empty</div>
       </template>

        <!-- ЛИБО #error + #success ЛИБО #error + #fullContent + #emptyContent -->

      <template #success>
        <div>success</div>
      </template>
    </Page>
</template>