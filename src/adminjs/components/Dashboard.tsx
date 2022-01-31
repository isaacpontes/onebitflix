import React, { useEffect, useState } from 'react'
import { H1, H2, Table, TableHead, TableBody, TableRow, TableCell } from '@adminjs/design-system'
import { ApiClient } from 'adminjs'

interface ResourceResponse {
  id: string
  translated: string
}

function Dashboard() {
  const [resources, setResources] = useState<ResourceResponse[]>()
  const api = new ApiClient()

  useEffect(() => {
    fetchDashboardData()
  }, [])

  async function fetchDashboardData() {
    const res = await api.getDashboard()
    const fetchedResources = res.data.resources

    setResources(fetchedResources)
  }

  return (
    <section style={{ padding: '1.5rem' }}>
      <H1>Seja bem-vindo!</H1>

      <section style={{ backgroundColor: '#FFF', padding: '1.5rem' }}>
        <H2>Resumo</H2>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: '#FF0043' }}>
              <TableCell style={{ color: "#FFF" }}>Recurso</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {resources?.map(resource => (
              <TableRow key={resource.id}>
                <TableCell>{resource.translated}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </section>
  )
}

export default Dashboard