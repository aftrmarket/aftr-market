<!-- This example requires Tailwind CSS v2.0+ -->
<template>
    <div class="grid grid-cols-2 gap-4 border">
        <div class="col-span-2">TOP</div>
        <div>SMARTWEAVE</div>
        <div>3EM</div>
    </div>
</template>

<script>


export default {
    data() {
        return {

        }
    },
    created() {
        this.$swal({
            // icon: "success",
            didOpen: () => {
                this.$swal.showLoading()
            },
            html: "Checking balances on Blue Horizon repo.",
            showConfirmButton: true,
            allowOutsideClick: false,
        });
    }
};
</script>