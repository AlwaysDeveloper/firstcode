import { Image, StyleSheet, Platform, View, TouchableOpacity, Text, Dimensions } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import WebView from 'react-native-webview';
import { CameraPwaApp } from '@/components/CameraPwa';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 10,
    backgroundColor: '#f5f5f5',
  },
  /* Cinema Mode Styles for Google Maps */
  cinemaContainer: {
    width: '100%',
    height: 500, // Larger height for cinema mode
    marginBottom: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 5,
  },
  cinemaTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007bff',
    textAlign: 'center',
    paddingVertical: 10,
    backgroundColor: '#e6f0ff',
  },
  cinemaWebView: {
    flex: 1,
  },

  /* Standard Styles for Other PWAs */
  webViewContainer: {
    width: width - 20, // Equal width for other WebViews
    height: 300,       // Equal height for other WebViews
    marginBottom: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    alignSelf: 'center',
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007bff',
    textAlign: 'center',
    paddingVertical: 10,
    backgroundColor: '#e6f0ff',
  },
  webView: {
    flex: 1,
  },

  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  gridItem: {
    width: (width / 2) - 15, // 2 items per row
    height: 250, // Fixed height for each WebView
    marginBottom: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
  },
  gridTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
    textAlign: 'center',
    paddingVertical: 8,
    backgroundColor: '#e6f0ff',
  },
  gridWebView: {
    flex: 1,
  },
});


export default function HomeScreen() {
  const titles = [
    { id: 1, title: 'Google Maps PWA', url: 'https://www.google.com/maps' },
    { id: 2, title: 'Camera PWA', url: 'http://172.18.0.1:5500/public/camera.web.html' },
    { id: 3, title: 'Spotify PWA', url: 'https://open.spotify.com' },
    { id: 4, title: 'Weather Widget', url: 'https://www.windy.com/' },
    { id: 5, title: 'Flipkart PWA', url: 'https://www.flipkart.com' },
  ];

  const [expendedId, setExpandedId] = useState<number | null>(null);

  const toggelWebView = (id: number) => setExpandedId(expendedId === id ? null : id);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Cinema Mode for Google Maps */}
      <View style={styles.cinemaContainer}>
        <Text style={styles.cinemaTitle}>{titles[0].title}</Text>
        <WebView
          source={{ uri: titles[0].url }}
          style={styles.cinemaWebView}
          startInLoadingState
        />
      </View>

      <View style={styles.gridContainer}>
        {titles.slice(1).map((item) => (
          <View key={item.id} style={styles.gridItem}>
            <Text style={styles.gridTitle}>{item.title}</Text>
            {
              item.title === 'Camera PWA' ? <CameraPwaApp uri={item.url}/> : <WebView
              source={{ uri: item.url }}
              style={styles.gridWebView}
              startInLoadingState
            />
            }
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
