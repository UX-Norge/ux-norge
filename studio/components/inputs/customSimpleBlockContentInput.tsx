import React from 'react'
import { Stack } from '@sanity/ui'
import { PortableTextInput } from 'sanity'
import styled from 'styled-components'

const Container = styled.div`
  [data-testid='pt-editor'][data-fullscreen='false'] {
    height: 120px;
    overflow-y: auto;
  }
`

const CustomSimpleBlockContentInput = (props: any) => {
    return (
        <Stack space={3}>
            <Container>
                {props.renderDefault({
                    ...props,
                    initialActive: true,
                })}
            </Container>
        </Stack>
    )
}

export default CustomSimpleBlockContentInput
