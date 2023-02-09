import React, {  useState } from 'react';
import { View,StyleSheet } from 'react-native';
import { mvs } from '../../services/metrices';
import colors from '../../services/colors';
import Row from '../atoms/row';
import ImagePlaceholder from '../atoms/Placeholder';
import { User } from '../../assets/images';
import Regular from '../../presentation/typography/regular-text';
import Bold from '../../presentation/typography/bold-text';
import { Rating } from 'react-native-elements';
import { URLS } from '../../store/api-urls';
const RatingItem = ({rating={}}) => {
    return (
        <View style={styles.container}>
              <Regular label={'3:30 pm'} size={12} color={colors.lightgrey1} style={{alignSelf: 'flex-end',}}/>
            <Row style={{alignItems:'center'}}>
                <ImagePlaceholder uri={{uri:`${URLS.image_url}${rating?.customer?.image}`}} containerStyle={styles.imageStyle}/>
                 <View style={{flex:1,marginLeft:mvs(10)}}>
                  <Bold label={rating?.customer?.name} size={15} color={colors.black}/>
                  <Rating imageSize={18} readonly type="custom"
                    startingValue={rating?.rating} style={styles.rating} 
                    ratingBackgroundColor={colors.lightgrey2} 
                    tintColor={colors.white}/>
          
                  <Regular label={rating?.description} size={12} color={colors.lightgrey1}/>
                </View>
            </Row>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
    borderRadius:mvs(15),
    paddingHorizontal:mvs(15),
    paddingVertical:mvs(13),
    ...colors.shadow,
    backgroundColor:colors.white,
    //
    marginTop:mvs(10)
    },
    imageStyle:{
    height:mvs(50),
    width:mvs(50),
    borderRadius:mvs(1000)
    },
    rating:{
        alignSelf:'flex-start'
    }
});
export default RatingItem;