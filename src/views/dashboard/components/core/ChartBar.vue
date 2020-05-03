<template>
<v-row>
    <base-material-card
      icon="mdi-chart-areaspline"
      title="Portfolio Table"
      color="#08182b"
      class="px-5 py-5 md-5"
      style="width:100%;margin:10px 50px 20px 50px;"
    >
      <v-simple-table>
        <thead>
          <tr>
            <th class="primary--text">
              Stock
            </th>
            <th class="primary--text">
              Price
            </th>
            <th class="primary--text">
              Shares
            </th>
            <th class="primary--text">
              Market Value
            </th>
            <th class="text-right primary--text">
              Total Profit
            </th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>1</td>
            <td>$40</td>
            <td>Niger</td>
            <td>Oud-Turnhout</td>
            <td class="text-right">
              $36,738
            </td>
          </tr>

          <tr>
            <td>2</td>
            <td>$20</td>
            <td>Curaçao</td>
            <td>Sinaas-Waas</td>
            <td class="text-right">
              $23,789
            </td>
          </tr>

          <tr>
            <td>3</td>
            <td>$30</td>
            <td>Netherlands</td>
            <td>Baileux</td>
            <td class="text-right">
              $56,142
            </td>
          </tr>

          <tr>
            <td>4</td>
            <td>$50</td>
            <td>Korea, South</td>
            <td>Overland Park</td>
            <td class="text-right">
              $38,735
            </td>
          </tr>

          <tr>
            <td>5</td>
            <td>$60</td>
            <td>Malawi</td>
            <td>Feldkirchen in Kärnten</td>
            <td class="text-right">
              $63,542
            </td>
          </tr>

          <tr>
            <td>6</td>
            <td>Mason Porter</td>
            <td>Chile</td>
            <td>Gloucester</td>
            <td class="text-right">
              $78,615
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </base-material-card>
</v-row>
</template>

<script>
export default {
    name: 'Chartbar',
    data(){
        return{


    }
    }

}
</script>

<style>

</style>